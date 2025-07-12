from django.urls import path

from .views import LogoutView, UserAPIView


urlpatterns = [
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", UserAPIView.as_view()),
]
