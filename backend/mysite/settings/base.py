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
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # installed
    "corsheaders",
    "rest_framework",
    "drf_spectacular",
    "oauth2_provider",
    "rosetta",
    "parler",
    "mdeditor",
    "taggit",
    # my custom
    "users.apps.UsersConfig",
    "core.apps.CoreConfig",
    "events.apps.EventsConfig",
    "departments.apps.DepartmentsConfig",
    "gallery.apps.GalleryConfig",
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
        "DIRS": [BASE_DIR / "templates"],
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
    ("uk", "Ukrainian"),
    ("en", "English"),
]

PARLER_LANGUAGES = {
    None: (
        {"code": "uk"},
        {"code": "en"},
    ),
    "default": {
        "fallback": "uk",
        "hide_untranslated": False,
    },
}

LANGUAGE_CODE = "uk"

LOCALE_PATHS = [BASE_DIR / "mysite" / "locale"]

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
    # "social_core.backends.google.GoogleOAuth2",
)

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = config("GOOGLE_OAUTH_CLIENT_ID", default="")
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = config("GOOGLE_OAUTH_CLIENT_SECRET", default="")

SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ["email", "profile"]
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = [
    "email",
    "first_name",
    "last_name",
    "picture",
]

SOCIAL_AUTH_GOOGLE_OAUTH2_AUTH_EXTRA_ARGUMENTS = {"hd": "nuwm.edu.ua"}

###########################
# REST-framework
###########################
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "oauth2_provider.contrib.rest_framework.OAuth2Authentication",
        "drf_social_oauth2.authentication.SocialAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "mysite.schema.AutoSchema",
}

###########################
# drf-spectacular
###########################
SPECTACULAR_SETTINGS = {
    "TITLE": "NUWM API",
    "DESCRIPTION": (
        "REST API для сайту Національного університету водного господарства та природокористування.\n\n"
        "## Авторизація\n"
        "Більшість ендпоінтів публічні. Захищені ендпоінти (`/users/me/`) потребують `Authorization: Bearer <access_token>`.\n\n"
        "## Мова відповіді\n"
        "Передавай заголовок `Accept-Language: uk` або `Accept-Language: en`. "
        "Якщо не вказано — повертається українська.\n\n"
        "## Авторизація через Google\n"
        "1. Отримай `code` та `code_verifier` через Google OAuth2 PKCE flow\n"
        "2. Надішли `POST /api/v1/auth/google/` → отримаєш `access_token` у тілі відповіді, "
        "`refresh_token` збережеться в HttpOnly cookie автоматично\n"
        "3. Оновлення токена: `POST /api/v1/auth/token/` з `grant_type=refresh_token` "
        "(cookie підставиться автоматично)\n"
        "4. Використовуй `access_token` у заголовку: `Authorization: Bearer <access_token>`"
    ),
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "TAGS": [
        {
            "name": "Core",
            "description": "Контент головної сторінки: слайдери, статистика, партнери, FAQ, випускники.",
        },
        {"name": "Events", "description": "Події університету."},
        {
            "name": "Departments",
            "description": "Кафедри, завідувачі та освітні програми.",
        },
        {
            "name": "Auth",
            "description": "Авторизація через Google OAuth2 та оновлення токенів.",
        },
        {
            "name": "Users",
            "description": "Профіль та роль поточного авторизованого користувача.",
        },
    ],
    "COMPONENT_SPLIT_REQUEST": True,
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
            "h4",
            "h5",
            "h6",
            "|",
            "list-ul",
            "list-ol",
            "|",
            "link",
            "table",
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
        "emoji": False,
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

###########################
# Unfold Admin
###########################
UNFOLD = {
    "SITE_TITLE": "НУВГП Адмін",
    "SITE_HEADER": "НУВГП",
    "SITE_LOGO": lambda request: request.build_absolute_uri("/static/logo/logo-cat.png"),
    "STYLES": [
        lambda request: request.build_absolute_uri("/static/admin/css/admin_fix.css"),
    ],
    "SIDEBAR": {
        "show_search": False,
        "show_all_applications": False,
        "navigation": "mysite.navigation.get_navigation",
    },
}

