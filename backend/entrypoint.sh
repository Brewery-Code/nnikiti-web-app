#!/bin/sh
set -e

python manage.py migrate --settings=mysite.settings.local

exec python manage.py runserver 0.0.0.0:8000 --settings=mysite.settings.local
