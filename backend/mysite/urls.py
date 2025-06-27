from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.views import TokenRefreshFromCookieView

schema_view = get_schema_view(
    openapi.Info(
        title="NNIKITI API",
        default_version="v1",
        description="Documentation for the NNIKITI API, which allows you to see all working endpoints.",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

v1_patterns = [
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema_swagger_ui",
    ),
    path(
        "swagger.<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path("core/", include(("core.urls", "core"))),
    path("auth/", include(("users.urls", "users"))),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include((v1_patterns, "v1"))),
    path("api/v1/auth/", include("social_django.urls", namespace="social")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
