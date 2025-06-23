from django.contrib import admin
from django.urls import include, path


v1_patterns = [
    path("core/", include(("core.urls", "core"))),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include((v1_patterns, "v1"))),
]
