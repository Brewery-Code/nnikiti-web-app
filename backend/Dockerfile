FROM python:3.14.0rc1-bookworm

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
PYTHONUNBUFFERED=1

RUN apt-get install -y curl
RUN apt-get install -y gettext
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY requirements.txt ./
RUN uv pip install -r requirements.txt --system

COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]