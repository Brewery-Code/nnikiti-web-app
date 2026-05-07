FROM python:3.14.0rc1-bookworm

ARG UID=1000
ARG GID=1000

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_PROJECT_ENVIRONMENT="/opt/venv" \
    PATH="/opt/venv/bin:$PATH"

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl gettext && \
    rm -rf /var/lib/apt/lists/* && \
    groupadd -g ${GID} app && \
    useradd -u ${UID} -g app -s /bin/sh -m app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY entrypoint.sh ./
RUN chmod 755 entrypoint.sh && chown -R app:app /app /opt/venv

USER app

EXPOSE 8000

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
