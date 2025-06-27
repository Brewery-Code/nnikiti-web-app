from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import User


class TokenRefreshFromCookieView(APIView):
    """
    Custom view for refreshing JWT tokens using
    a refresh token from cookies or request body.
    """

    def post(self, request, *args, **kwargs):
        refresh = request.data.get("refresh") or request.COOKIES.get("refresh_token")
        if not refresh:
            raise AuthenticationFailed("No refresh token provided.")

        serializer = TokenRefreshSerializer(data={"refresh": refresh})
        serializer.is_valid(raise_exception=True)

        access = serializer.validated_data.get("access")
        new_refresh = serializer.validated_data.get("refresh", refresh)

        response = Response(
            {"detail": "Token successfully updated."}, status=status.HTTP_200_OK
        )

        response.set_cookie(
            "refresh_token",
            new_refresh,
            httponly=True,
            secure=False,  # True на проді
            samesite="Lax",  # або 'None' з HTTPS
            path="/api/v1/auth/token/refresh/",
        )

        response.set_cookie(
            "access_token",
            access,
            httponly=False,
            secure=False,
            samesite="Lax",
        )

        return response


class LogoutView(APIView):
    """Custom view for logout user"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token not provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            response = Response(status=status.HTTP_204_NO_CONTENT)
            response.delete_cookie("refresh_token", path="/api/v1/auth/token/refresh/")
            response.delete_cookie("access_token")
            return response
        except TokenError:
            return Response(
                {"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST
            )


class UserAPIView(APIView):
    """API view to retrieve the authenticated user's profile data."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        response = Response(
            {
                "id": user.pk,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "avatar": user.avatar,
            }
        )
        return response
