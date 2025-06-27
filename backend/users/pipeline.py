from django.shortcuts import redirect
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken


def get_token_google_oauth(strategy, details, user=None, *args, **kwargs):
    """
    Custom pipeline function for social-auth that
    generates JWT tokens after successful Google OAuth login.
    """
    if user:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        frontend_url = f"http://127.0.0.1:5173/"
        response = redirect(frontend_url)
        response.set_cookie(
            "refresh_token",
            refresh_token,
            httponly=True,
            secure=False,
            samesite="Lax",  # Strix, None
            path="/api/v1/users",
        )

        response.set_cookie(
            "access_token",
            access_token,
            httponly=False,
            secure=False,
            samesite="Lax",
        )

        return response
    else:
        error_redirect_url = "http://127.0.0.1:5173/auth/error"
        return redirect(error_redirect_url)


def save_avatar(backend, user, response, *args, **kwargs):
    """Custom pipeline function for saving user avatar"""
    picture_url = response.get("picture")
    if picture_url and user.avatar != picture_url:
        user.avatar = picture_url
        user.save()
