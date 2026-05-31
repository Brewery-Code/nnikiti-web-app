#!/bin/sh
set -e

SETTINGS=${DJANGO_SETTINGS_MODULE:-mysite.settings.local}

python manage.py migrate --settings=$SETTINGS
python manage.py compilemessages --settings=$SETTINGS

if [ "$DJANGO_SETTINGS_MODULE" = "mysite.settings.prod" ]; then
    python manage.py collectstatic --noinput --settings=$SETTINGS
    exec gunicorn mysite.wsgi:application \
        --bind 0.0.0.0:8000 \
        --workers 2 \
        --timeout 120
else
    exec python manage.py runserver 0.0.0.0:8000 --settings=$SETTINGS
fi
