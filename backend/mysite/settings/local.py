from .base import *


###########################
# General
###########################
DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1", "localhost",]

###########################
# Database
###########################
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("POSTGRES_DB"),
        "USER": config("POSTGRES_USER"),
        "PASSWORD": config("POSTGRES_PASSWORD"),
        "HOST": config("POSTGRES_HOST"),
        "PORT": config("POSTGRES_PORT", default="5432"),
    }
}

###########################
# Static files
# (CSS, JavaScript, Images)
###########################
STATIC_URL = "static/"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

###########################
# CORS
###########################
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS = True

###########################
# OAuth2 provider
###########################
OAUTH2_PROVIDER = {
    "ACCESS_TOKEN_EXPIRE_SECONDS": 3600,
    "REFRESH_TOKEN_EXPIRE_SECONDS": 2592000,
    "ROTATE_REFRESH_TOKEN": True,
}