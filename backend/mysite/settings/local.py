import colorlog

from .base import *

###########################
# GENERAL
###########################
DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1", "localhost",]

###########################
# DATABASE
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
# STATIC FILES
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
    "http://192.168.0.108:5173"
]
CORS_ALLOW_CREDENTIALS = True

###########################
# OAUTH2 PROVIDER
###########################
OAUTH2_PROVIDER = {
    "ACCESS_TOKEN_EXPIRE_SECONDS": 10,
    "REFRESH_TOKEN_EXPIRE_SECONDS": 2592000,
    "ROTATE_REFRESH_TOKEN": True,
}

###########################
# LOGGERS
###########################
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {name} {funcName} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "colored": {
            "()": "colorlog.ColoredFormatter",
            "format": "%(log_color)s%(levelname)s %(asctime)s %(name)s %(funcName)s %(message)s",
            "log_colors": {
                "DEBUG":    "white",
                "INFO":     "green",
                "WARNING":  "yellow",
                "ERROR":    "red",
                "CRITICAL": "bold_red",
            }
        }
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "colored",
        }
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": config("DJANGO_LOG_LEVEL", default="INFO"),
            "propagate": False,
        },
        "users": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": False,
        },
    }
}
