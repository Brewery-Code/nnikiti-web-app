from pathlib import Path
from decouple import config


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

###########################
# Applications
###########################
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # installed
    "corsheaders",
    'rest_framework',
    'oauth2_provider',
    "rosetta",
    "parler",
    "mdeditor",
    # my custom
    "users.apps.UsersConfig",
    "core.apps.CoreConfig",
    "events.apps.EventsConfig",
]

###########################
# Middleware
###########################
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

###########################
# Templates
###########################
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.i18n",
            ],
        },
    },
]

###########################
# Password validation
###########################
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

###########################
# Languages and timezone
###########################
LANGUAGES = [
    ("en", "English"),
    ("uk", "Ukrainian"),
]

PARLER_LANGUAGES = {
    None: (
        {"code": "uk"},
        {"code": "en"},
    ),
    "default": {
        "fallback": "en",
        "hide_untranslated": False,
    },
}

LANGUAGE_CODE = "en"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

###########################
# General
###########################
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "users.User"

ROOT_URLCONF = "mysite.urls"

WSGI_APPLICATION = "mysite.wsgi.application"

###########################
# OAuth2
###########################
AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "social_core.backends.google.GoogleOAuth2",
)

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = config("GOOGLE_OAUTH_CLIENT_ID")
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = config("GOOGLE_OAUTH_CLIENT_SECRET")

SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ["email", "profile"]
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = [
    "email",
    "first_name",
    "last_name",
    "picture",
]

###########################
# REST-framework
###########################
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "oauth2_provider.contrib.rest_framework.OAuth2Authentication",
        "drf_social_oauth2.authentication.SocialAuthentication",
    )
}

###########################
# MDEditor
###########################
X_FRAME_OPTIONS = "SAMEORIGIN"

MDEDITOR_CONFIGS = {
    "default": {
        "width": "90% ",
        "height": 500,
        "toolbar": [
            "undo",
            "redo",
            "|",
            "bold",
            "del",
            "italic",
            "quote",
            "ucwords",
            "uppercase",
            "lowercase",
            "|",
            "h1",
            "h2",
            "h3",
            "h5",
            "h6",
            "|",
            "list-ul",
            "list-ol",
            "hr",
            "|",
            "link",
            "reference-link",
            "image",
            "code",
            "preformatted-text",
            "code-block",
            "table",
            "datetime",
            "emoji",
            "html-entities",
            "pagebreak",
            "goto-line",
            "|",
            "help",
            "info",
            "||",
            "preview",
            "watch",
            "fullscreen",
        ],
        "upload_image_formats": [
            "jpg",
            "jpeg",
            "gif",
            "png",
            "bmp",
            "webp",
        ],
        "image_folder": "editor",
        "theme": "dark",
        "preview_theme": "default",
        "editor_theme": "default",
        "toolbar_autofixed": True,
        "search_replace": True,
        "emoji": True,
        "tex": True,
        "flow_chart": True,
        "sequence": True,
        "watch": True,
        "lineWrapping": False,
        "lineNumbers": False,
        "language": "en",
    }
}

MARKDOWNX_MARKDOWN_EXTENSIONS = [
    "markdown.extensions.extra",
    "markdown.extensions.codehilite",
    "markdown.extensions.toc",
]
