from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed


class TokenRefreshFromCookieView(APIView):
    def post(self, request, *args, **kwargs):
        refresh = request.data.get("refresh") or request.COOKIES.get("refresh_token")
        if not refresh:
            raise AuthenticationFailed("No refresh token provided.")

        serializer = TokenRefreshSerializer(data={"refresh": refresh})
        serializer.is_valid(raise_exception=True)

        access = serializer.validated_data.get("access")
        new_refresh = serializer.validated_data.get("refresh", refresh)

        response = Response({"access": access}, status=status.HTTP_200_OK)

        response.set_cookie(
            "refresh_token",
            new_refresh,
            httponly=True,
            secure=False,  # True на проді
            samesite="Lax",  # або 'None' з HTTPS
            path="/api/v1/auth/token/refresh/",
        )

        return response
