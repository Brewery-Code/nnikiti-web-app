from django.urls import path

from .views import TokenRefreshFromCookieView, LogoutView


urlpatterns = [
    path(
        "token/refresh/",
        TokenRefreshFromCookieView.as_view(),
        name="token_refresh",
    ),
    path("logout/", LogoutView.as_view(), name="logout"),
]
