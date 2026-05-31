#!/bin/sh
set -e

SETTINGS=${DJANGO_SETTINGS_MODULE:-mysite.settings.local}

python manage.py migrate --settings=$SETTINGS
python manage.py compilemessages --settings=$SETTINGS

if [ "$DJANGO_SETTINGS_MODULE" = "mysite.settings.prod" ]; then
    python manage.py collectstatic --noinput --settings=$SETTINGS

    # Load initial data if DB is empty (no departments exist)
    COUNT=$(python manage.py shell --settings=$SETTINGS -c "from departments.models.departments import Department; print(Department.objects.count())" 2>/dev/null || echo "0")
    if [ "$COUNT" = "0" ]; then
        echo "Loading initial data..."
        python manage.py loaddata new_dump.json --settings=$SETTINGS || true
    fi

    exec gunicorn mysite.wsgi:application \
        --bind 0.0.0.0:8000 \
        --workers 2 \
        --timeout 120
else
    exec python manage.py runserver 0.0.0.0:8000 --settings=$SETTINGS
fi
