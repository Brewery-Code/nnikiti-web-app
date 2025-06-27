from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static


v1_patterns = [
    path("core/", include(("core.urls", "core"))),
    path("users/", include(("users.urls", "users"))),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include((v1_patterns, "v1"))),
    path("api/v1/users/", include("social_django.urls", namespace="social")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
