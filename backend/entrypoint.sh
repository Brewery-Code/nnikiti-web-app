#!/bin/sh

echo "Running migrations..."
python manage.py migrate --settings=config.settings.local

echo "Starting server..."
python manage.py runserver 0.0.0.0:8000 --settings=config.settings.local

