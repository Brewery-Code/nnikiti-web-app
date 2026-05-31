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

RUN curl -LsSf https://astral.sh/uv/install.sh | sh && \
    mv /root/.local/bin/uv /bin/uv && \
    mv /root/.local/bin/uvx /bin/uvx

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --no-dev

COPY . .
RUN chmod 755 entrypoint.sh && chown -R app:app /app /opt/venv

USER app

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate --settings=mysite.settings.local && exec python manage.py runserver 0.0.0.0:8000 --settings=mysite.settings.local"]
