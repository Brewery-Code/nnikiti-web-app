#!/bin/sh
set -e

SETTINGS=${DJANGO_SETTINGS_MODULE:-mysite.settings.local}

python manage.py migrate --settings=$SETTINGS
python manage.py compilemessages --settings=$SETTINGS

if [ "$DJANGO_SETTINGS_MODULE" = "mysite.settings.prod" ]; then
    python manage.py collectstatic --noinput --settings=$SETTINGS

    if [ "$LOAD_FIXTURES" = "1" ]; then
        echo "Loading initial data..."
        python manage.py loaddata new_dump.json --settings=$SETTINGS || true
    fi

    if [ -n "$ADMIN_PASSWORD" ]; then
        python manage.py shell --settings=$SETTINGS -c "
from users.models import User
u = User.objects.filter(is_superuser=True).first()
if u:
    u.set_password('$ADMIN_PASSWORD')
    u.save()
    print('Admin password reset for:', u.email)
"
    fi

    exec gunicorn mysite.wsgi:application \
        --bind 0.0.0.0:8000 \
        --workers 1 \
        --threads 4 \
        --timeout 120
else
    exec python manage.py runserver 0.0.0.0:8000 --settings=$SETTINGS
fi
