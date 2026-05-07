import logging
import json
import hashlib
from datetime import timedelta
from urllib.parse import unquote

import requests
from django.http import HttpResponse
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import APIException
from rest_framework import serializers as drf_serializers
from drf_spectacular.utils import extend_schema, inline_serializer, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes

from oauthlib.common import generate_token
from oauth2_provider.views.mixins import OAuthLibMixin
from oauth2_provider.signals import app_authorized
from oauth2_provider.settings import oauth2_settings
from oauth2_provider.models import (
    Application,
    AccessToken,
    RefreshToken,
    get_access_token_model,
)

from mysite.settings import base
from .utils import assign_user_role, check_user_email


User = get_user_model()
logger = logging.getLogger(__name__)

GOOGLE_CLIENT_ID = base.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY
GOOGLE_CLIENT_SECRET = base.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET
REDIRECT_URI = "http://127.0.0.1:5173/"


@extend_schema(
    tags=['Auth'],
    summary='Вхід через Google OAuth2 (PKCE)',
    description=(
        'Приймає `code` та `code_verifier` з Google OAuth2 PKCE flow.\n\n'
        'У відповіді повертає `access_token` у тілі. '
        '`refresh_token` встановлюється як **HttpOnly cookie** автоматично — фронтенд його не бачить.\n\n'
        'Домен обмежений: тільки `@nuwm.edu.ua` пошти.'
    ),
    request=inline_serializer(
        name='GoogleLoginRequest',
        fields={
            'code': drf_serializers.CharField(help_text='Authorization code від Google'),
            'code_verifier': drf_serializers.CharField(help_text='PKCE code verifier'),
        },
    ),
    responses={
        200: inline_serializer(
            name='GoogleLoginResponse',
            fields={
                'access_token': drf_serializers.CharField(help_text='Bearer токен для запитів'),
                'expires_in': drf_serializers.IntegerField(help_text='Час дії токена в секундах'),
                'token_type': drf_serializers.CharField(help_text='Завжди "Bearer"'),
            },
        ),
        400: OpenApiResponse(description='Відсутній code/code_verifier або помилка Google'),
    },
    examples=[
        OpenApiExample(
            'Запит',
            value={'code': 'abc123...', 'code_verifier': 'xyz789...'},
            request_only=True,
        ),
        OpenApiExample(
            'Успішна відповідь',
            value={'access_token': 'abc...', 'expires_in': 10, 'token_type': 'Bearer'},
            response_only=True,
            status_codes=['200'],
        ),
    ],
)
@api_view(["POST"])
def google_login(request):
    """
    Handles login via Google OAuth2 using Authorization Code Flow with PKCE.

    This endpoint accepts the authorization code and code verifier from the frontend,
    exchanges them for Google access token, retrieves user profile information,
    and creates or updates a user in the local database.

    Then it generates access and refresh tokens using Django OAuth Toolkit and returns
    the access token in the response body and sets the refresh token in a secure HttpOnly cookie.

    Expected POST data (JSON):
    - code: str (authorization code returned by Google)
    - code_verifier: str (code verifier for PKCE)

    Notes:
    - The `refresh_token` is stored in an HttpOnly cookie (for silent refresh on frontend).
    - Assigns a role (e.g., STUDENT, TEACHER, GUEST) based on NUWM email pattern.
    - Requires GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI configured in settings.
    """
    code = request.data.get("code")
    if code:
        code = unquote(code)
    code_verifier = request.data.get("code_verifier")

    if not code or not code_verifier:
        logger.error(f"Missing code or code verifier.")
        return Response({"error": "Missing code or code_verifier"}, status=400)

    # Google token exchange
    try:
        token_resp = requests.post("https://oauth2.googleapis.com/token", data={
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "code": code,
            "code_verifier": code_verifier,
            "grant_type": "authorization_code",
            "redirect_uri": REDIRECT_URI,
        }).json()
    except ValueError:
        logger.error(f"Google token endpoint did not return JSON.")
        return Response({"error": "Invalid response from Google"}, status=502)

    if "error" in token_resp:
        logger.warning(f"Google exchange failed. Details: {token_resp}")
        return Response({"error": "Google exchange failed",
                         "details": token_resp}, status=400)

    access_token = token_resp.get("access_token")

    # Retrieving and storing user information
    userinfo = requests.get("https://openidconnect.googleapis.com/v1/userinfo",
                            headers={"Authorization": f"Bearer {access_token}"}).json()

    email = userinfo.get("email")
    if not email:
        logger.warning(f"No information returned from Google.")
        return Response({"error": "No email returned by Google",
                         "userinfo": userinfo}, status=400)

    check_user_email(email)

    user, created = User.objects.get_or_create(email=email, defaults={
        "email": email,
        "first_name": userinfo.get("given_name", ""),
        "last_name": userinfo.get("family_name", ""),
        "avatar": userinfo.get("picture", ""),
    })

    if created:
        logger.info(f"New user registered: id={user.pk} | email={user.email}")
    else:
        logger.info(f"User logged in: id={user.pk} | email={user.email}")
        user.first_name = userinfo.get("given_name", user.first_name)
        user.last_name = userinfo.get("family_name", user.last_name)
        user.avatar = userinfo.get("picture", user.avatar)

    user.last_login = timezone.now()
    user.save()

    assign_user_role(user)

    # token generation
    app = Application.objects.get(name="React SPA")
    expires = timezone.now() + timedelta(seconds=oauth2_settings.ACCESS_TOKEN_EXPIRE_SECONDS)

    access_token_obj = AccessToken.objects.create(
        user=user,
        application=app,
        token=generate_token(),
        expires=expires,
        scope="read write"
    )

    refresh_token_obj = RefreshToken.objects.create(
        user=user,
        token=generate_token(),
        application=app,
        access_token=access_token_obj
    )

    response = Response({
        "access_token": access_token_obj.token,
        "expires_in": oauth2_settings.ACCESS_TOKEN_EXPIRE_SECONDS,
        "token_type": "Bearer"
    })

    response.set_cookie(
        "refresh_token",
        refresh_token_obj.token,
        httponly=True,
        secure=False,  # True on prod
        samesite="Lax",
        path="/api/v1/auth/token/",
    )

    return response


@extend_schema(
    tags=['Auth'],
    summary='Оновлення access token',
    description=(
        'Оновлює `access_token` використовуючи `refresh_token` з HttpOnly cookie.\n\n'
        'Фронтенд надсилає тільки `grant_type` і `client_id` — '
        'cookie з `refresh_token` браузер підставляє автоматично.'
    ),
    request=inline_serializer(
        name='TokenRefreshRequest',
        fields={
            'grant_type': drf_serializers.ChoiceField(
                choices=['refresh_token'],
                help_text='Завжди `refresh_token`',
            ),
            'client_id': drf_serializers.CharField(help_text='OAuth2 client_id застосунку'),
        },
    ),
    responses={
        200: inline_serializer(
            name='TokenRefreshResponse',
            fields={
                'access_token': drf_serializers.CharField(),
                'expires_in': drf_serializers.IntegerField(),
                'token_type': drf_serializers.CharField(),
            },
        ),
        400: OpenApiResponse(description='Невалідний або протермінований refresh_token'),
    },
)
@method_decorator(csrf_exempt, name='dispatch')
class CustomTokenView(OAuthLibMixin, APIView):
    """
    Custom OAuth2 Token Endpoint that supports refresh_token grant using HttpOnly cookie.

    This endpoint extends the standard OAuth2 token behavior provided by Django OAuth Toolkit,
    allowing the `refresh_token` to be securely provided via cookie instead of form-data.

    Security:
    - This view is CSRF exempt since it is expected to be called by a frontend using cookies
    - Ensure HTTPS (`secure=True`) in production to protect HttpOnly cookie

    Notes:
    - This view allows a more secure refresh mechanism by avoiding exposure of the refresh token in JS.
    - Useful in SPA scenarios where tokens are stored in memory and refresh token lives in a protected cookie.

    """

    def post(self, request, *args, **kwargs):
        if request.data.get("grant_type") == "refresh_token":
            refresh_token_cookie = request.COOKIES.get("refresh_token")
            if refresh_token_cookie:
                post = request._request.POST.copy()
                post["refresh_token"] = refresh_token_cookie
                request._request.POST = post

        url, headers, body, status = self.create_token_response(request._request)

        token_data = json.loads(body)

        if status == 200:
            access_token = token_data.get("access_token")
            refresh_token = token_data.get("refresh_token")

            if access_token:
                token_checksum = hashlib.sha256(access_token.encode("utf-8")).hexdigest()
                token = get_access_token_model().objects.get(token_checksum=token_checksum)
                app_authorized.send(sender=self, request=request, token=token)

            response_data = {
                "access_token": access_token,
                "expires_in": token_data.get("expires_in", oauth2_settings.ACCESS_TOKEN_EXPIRE_SECONDS),
                "token_type": token_data.get("token_type", "Bearer"),
            }

            response = Response(response_data, status=status)

            if refresh_token:
                response.set_cookie(
                    "refresh_token",
                    refresh_token,
                    httponly=True,
                    secure=False,  # True on prod
                    samesite="Lax",
                    path="/api/v1/auth/token/",
                )

            return response

        return HttpResponse(content=body, status=status, headers=headers)


@extend_schema(
    tags=['Users'],
    summary='Профіль поточного користувача',
    description='Потребує `Authorization: Bearer <access_token>`.',
    responses={
        200: inline_serializer(
            name='UserProfileResponse',
            fields={
                'id': drf_serializers.IntegerField(),
                'first_name': drf_serializers.CharField(),
                'last_name': drf_serializers.CharField(),
                'email': drf_serializers.EmailField(),
                'avatar': drf_serializers.CharField(help_text='URL аватара з Google'),
            },
        ),
        401: OpenApiResponse(description='Токен відсутній або недійсний'),
    },
)
class UserAPIView(APIView):
    """
    API view to retrieve the authenticated user's profile data.
    Requires a valid access token (expected in headers).
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            data = {
                "id": user.pk,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "avatar": user.avatar,
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            raise APIException(f"Failed to retrieve user profile: {str(e)}")


@extend_schema(
    tags=['Users'],
    summary='Роль поточного користувача',
    description=(
        'Публічний ендпоінт. Для неавторизованих повертає роль `GU` (Guest).\n\n'
        '| Роль | Код |\n|------|-----|\n'
        '| Admin | `AD` |\n| Teacher | `TE` |\n| Student | `ST` |\n| Data Operator | `DO` |\n| Guest | `GU` |'
    ),
    responses={
        200: inline_serializer(
            name='UserRoleResponse',
            fields={
                'id': drf_serializers.IntegerField(allow_null=True, help_text='null для гостя'),
                'role': drf_serializers.ChoiceField(
                    choices=['AD', 'TE', 'ST', 'DO', 'GU'],
                    help_text='GU — неавторизований',
                ),
            },
        ),
    },
)
class UserRoleAPIView(APIView):
    """API view to retrieve the user's role."""
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user

        if isinstance(user, AnonymousUser):
            return Response({
                "id": None,
                "role": "GU"
            }, status=status.HTTP_200_OK)

        try:
            data = {
                "id": user.pk,
                "role": user.role,
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            raise APIException(f"Failed to retrieve user role: {str(e)}")
