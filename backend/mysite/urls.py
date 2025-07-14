from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from users.views import google_login, CustomTokenView


v1_patterns = [
    path("core/", include("core.urls")),
    path("users/", include("users.urls" )),
    path("events/", include("events.urls")),
    path('auth/token/', CustomTokenView.as_view(), name="token"),
    path("auth/google/", google_login, name='google_login'),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("rosetta/", include("rosetta.urls")),
    path("mdeditor/", include("mdeditor.urls")),
    path("api/v1/", include(v1_patterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
