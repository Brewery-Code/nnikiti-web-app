FROM python:3.14.0rc1-bookworm

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl gettext && \
    rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY requirements.txt .
RUN uv pip install -r requirements.txt --system

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod 755 /app/entrypoint.sh

COPY . .

EXPOSE 8000

ENTRYPOINT ["sh","/app/entrypoint.sh"]
