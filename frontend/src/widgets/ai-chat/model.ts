export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export function createMessage(role: ChatRole, text: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
  };
}

const SESSION_KEY = "ai_chat_session_id";
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

function getSessionId(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

function setSessionId(id: string): void {
  localStorage.setItem(SESSION_KEY, id);
}

export async function requestAssistantReply(input: string, lang: string): Promise<string> {
  const sessionId = getSessionId();

  const res = await fetch(`${API_BASE}/ai/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: input,
      lang,
      ...(sessionId ? { session_id: sessionId } : {}),
    }),
  });

  if (!res.ok) {
    return lang.startsWith("uk")
      ? "Вибачте, сталася помилка. Спробуйте ще раз пізніше."
      : "Sorry, an error occurred. Please try again later.";
  }

  const data: { reply: string; session_id: string } = await res.json();
  setSessionId(data.session_id);
  return data.reply;
}
