SETTINGS ?= mysite.settings.local
CONTAINER = api_container
COMPOSE = docker compose

MANAGE = docker exec $(CONTAINER) python manage.py --settings=$(SETTINGS)

# ─── Containers ───────────────────────────────────────────────────────────────

.PHONY: up
up:
	$(COMPOSE) up

.PHONY: upd
up:
	$(COMPOSE) up -d

.PHONY: down
down:
	$(COMPOSE) down

.PHONY: build
build:
	$(COMPOSE) build

.PHONY: rebuild
rebuild:
	$(COMPOSE) down && $(COMPOSE) build --no-cache && $(COMPOSE) up

.PHONY: restart
restart:
	$(COMPOSE) restart api

.PHONY: logs
logs:
	$(COMPOSE) logs -f api

.PHONY: ps
ps:
	$(COMPOSE) ps

# ─── Django ───────────────────────────────────────────────────────────────────

.PHONY: migrate
migrate:
	$(MANAGE) migrate

.PHONY: migrations
migrations:
	$(MANAGE) makemigrations

.PHONY: shell
shell:
	$(MANAGE) shell

.PHONY: superuser
superuser:
	$(MANAGE) createsuperuser

.PHONY: collectstatic
collectstatic:
	$(MANAGE) collectstatic --noinput

# ─── Fixtures ─────────────────────────────────────────────────────────────────

.PHONY: loaddata
loaddata:
	$(MANAGE) loaddata backup.json core-backup.json

.PHONY: dumpdata
dumpdata:
	$(MANAGE) dumpdata --natural-foreign --natural-primary \
		--exclude auth.permission --exclude contenttypes \
		--indent 2 -o backup.json

# ─── Translations ─────────────────────────────────────────────────────────────

.PHONY: messages
messages:
	$(MANAGE) makemessages -l uk -l en

.PHONY: compilemessages
compilemessages:
	$(MANAGE) compilemessages

# ─── uv ───────────────────────────────────────────────────────────────────────

.PHONY: lock
lock:
	uv lock

.PHONY: sync
sync:
	uv sync

# ─── Help ─────────────────────────────────────────────────────────────────────

.PHONY: help
help:
	@echo ""
	@echo "  Containers"
	@echo "    make up            Start all containers"
	@echo "    make down          Stop all containers"
	@echo "    make build         Build images"
	@echo "    make rebuild       Full rebuild from scratch"
	@echo "    make restart       Restart api container"
	@echo "    make logs          Follow api logs"
	@echo "    make ps            Show container status"
	@echo ""
	@echo "  Django"
	@echo "    make migrate       Apply migrations"
	@echo "    make migrations    Create new migrations"
	@echo "    make shell         Django shell"
	@echo "    make superuser     Create superuser"
	@echo "    make collectstatic Collect static files"
	@echo ""
	@echo "  Fixtures"
	@echo "    make loaddata      Load backup.json + core-backup.json"
	@echo "    make dumpdata      Dump current DB to backup.json"
	@echo ""
	@echo "  Translations"
	@echo "    make messages      Extract strings for translation"
	@echo "    make compilemessages Compile .po files"
	@echo ""
	@echo "  uv"
	@echo "    make lock          Generate uv.lock"
	@echo "    make sync          Install dependencies from uv.lock"
	@echo ""
	@echo "  Override settings:  make migrate SETTINGS=mysite.settings.prod"
	@echo ""
