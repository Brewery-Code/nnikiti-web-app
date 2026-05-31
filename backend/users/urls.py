from django.urls import path

from .views import UserAPIView, UserRoleAPIView


urlpatterns = [
    path("me/", UserAPIView.as_view(), name="me"),
    path("role/", UserRoleAPIView.as_view(), name="role"),
]
