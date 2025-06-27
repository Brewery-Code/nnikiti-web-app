from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class CookieJWTAuthentication(JWTAuthentication):
    """
    Custom JWT authentication that checks for the access token in cookies first,
    and falls back to Authorization header if not found.
    """

    def authenticate(self, request):
        access_token = request.COOKIES.get("access_token")

        if access_token:
            try:
                validated_token = self.get_validated_token(access_token)
                return self.get_user(validated_token), validated_token
            except Exception:
                raise AuthenticationFailed("Invalid token in cookie.")

        return super().authenticate(request)
