from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from users.views import google_login, CustomTokenView
import oauth2_provider.views as oauth2_views

v1_patterns = [
    path("core/", include(("core.urls", "core"))),
    path("users/", include(("users.urls", "users"))),
    path("events/", include(("events.urls", "news"))),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("rosetta/", include("rosetta.urls")),
    path("mdeditor/", include("mdeditor.urls")),
    path("api/v1/", include((v1_patterns, "v1"))),
    path('api/v1/o/authorize/', oauth2_views.AuthorizationView.as_view(), name="authorize"),
    path('api/v1/o/token/', CustomTokenView.as_view(), name="token"),
    path("api/v1/auth/google/", google_login),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
