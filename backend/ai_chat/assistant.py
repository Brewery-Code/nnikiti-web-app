import re
import time
import logging

import requests
from django.conf import settings

logger = logging.getLogger(__name__)

OPENAI_API_BASE = "https://api.openai.com/v1"
# Assistants API потребує цього заголовка
BETA_HEADER = "assistants=v2"


def _headers() -> dict:
    return {
        "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
        "Content-Type": "application/json",
        "OpenAI-Beta": BETA_HEADER,
    }


def create_thread() -> str:
    """Створює новий OpenAI Thread і повертає його ID."""
    resp = requests.post(
        f"{OPENAI_API_BASE}/threads",
        headers=_headers(),
        json={},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["id"]


def get_reply(thread_id: str, user_message: str, lang: str = "uk") -> str:
    """
    Надсилає повідомлення до існуючого Thread, запускає Assistant Run
    і повертає текст відповіді.
    """
    # 1. Додаємо повідомлення користувача до треду
    resp = requests.post(
        f"{OPENAI_API_BASE}/threads/{thread_id}/messages",
        headers=_headers(),
        json={"role": "user", "content": user_message},
        timeout=30,
    )
    resp.raise_for_status()

    # 2. Запускаємо Run з підказкою про мову
    lang_hint = "Відповідай українською мовою." if lang.startswith("uk") else "Reply in English."
    resp = requests.post(
        f"{OPENAI_API_BASE}/threads/{thread_id}/runs",
        headers=_headers(),
        json={
            "assistant_id": settings.OPENAI_ASSISTANT_ID,
            "additional_instructions": lang_hint,
        },
        timeout=30,
    )
    resp.raise_for_status()
    run_id = resp.json()["id"]

    # 3. Polling поки Run не завершиться
    return _wait_for_run(thread_id, run_id)


def _wait_for_run(thread_id: str, run_id: str, timeout: int = 55) -> str:
    deadline = time.time() + timeout
    delay = 0.5

    while time.time() < deadline:
        resp = requests.get(
            f"{OPENAI_API_BASE}/threads/{thread_id}/runs/{run_id}",
            headers=_headers(),
            timeout=30,
        )
        resp.raise_for_status()
        run = resp.json()

        if run["status"] == "completed":
            return _extract_last_reply(thread_id)

        if run["status"] in {"failed", "cancelled", "expired"}:
            logger.error("OpenAI Run %s ended with status: %s", run_id, run["status"])
            raise RuntimeError(f"OpenAI Run failed with status: {run['status']}")

        time.sleep(delay)
        delay = min(delay * 1.5, 4)

    raise TimeoutError("OpenAI Run did not complete in time")


def _extract_last_reply(thread_id: str) -> str:
    resp = requests.get(
        f"{OPENAI_API_BASE}/threads/{thread_id}/messages",
        headers=_headers(),
        params={"order": "desc", "limit": 1},
        timeout=30,
    )
    resp.raise_for_status()
    data = resp.json()

    for msg in data.get("data", []):
        if msg["role"] == "assistant":
            for block in msg.get("content", []):
                if block["type"] == "text":
                    text = block["text"]["value"]
                    # Видаляємо citation markers від file_search: 【4:0†source】
                    text = re.sub(r"【[^】]*】", "", text).strip()
                    return text
    return ""
