import uuid
import logging

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers

from .models import Conversation, Message
from .assistant import create_thread, get_reply

logger = logging.getLogger(__name__)

FALLBACK_UK = "Вибачте, сталася помилка. Спробуйте ще раз пізніше."
FALLBACK_EN = "Sorry, an error occurred. Please try again later."


class ChatView(APIView):
    """
    POST /api/v1/ai/chat/

    Надсилає повідомлення до AI асистента і повертає відповідь.
    Якщо session_id не передано або невалідний — автоматично стартує нову сесію.
    """
    permission_classes = [AllowAny]
    authentication_classes = []

    @extend_schema(
        tags=["AI Chat"],
        summary="Надіслати повідомлення AI асистенту",
        request=inline_serializer(
            name="ChatRequest",
            fields={
                "message": serializers.CharField(),
                "session_id": serializers.CharField(required=False, allow_blank=True),
                "lang": serializers.CharField(required=False, default="uk"),
            },
        ),
        responses={
            200: inline_serializer(
                name="ChatResponse",
                fields={
                    "reply": serializers.CharField(),
                    "session_id": serializers.CharField(),
                },
            )
        },
    )
    def post(self, request):
        message = (request.data.get("message") or "").strip()
        if not message:
            return Response({"detail": "message is required"}, status=status.HTTP_400_BAD_REQUEST)

        lang = (request.data.get("lang") or "uk").strip()
        session_id = (request.data.get("session_id") or "").strip()

        # Знаходимо або створюємо сесію
        conv = self._get_or_create_conversation(session_id)

        # Зберігаємо повідомлення користувача
        Message.objects.create(
            conversation=conv,
            role=Message.Role.USER,
            text=message,
        )

        # Отримуємо відповідь від OpenAI Assistants
        try:
            reply = get_reply(
                thread_id=conv.openai_thread_id,
                user_message=message,
                lang=lang,
            )
            if not reply:
                reply = FALLBACK_UK if lang.startswith("uk") else FALLBACK_EN
        except Exception:
            logger.exception("OpenAI Assistant error for session %s", conv.session_id)
            reply = FALLBACK_UK if lang.startswith("uk") else FALLBACK_EN

        # Зберігаємо відповідь асистента
        Message.objects.create(
            conversation=conv,
            role=Message.Role.ASSISTANT,
            text=reply,
        )

        return Response({"reply": reply, "session_id": conv.session_id})

    def _get_or_create_conversation(self, session_id: str) -> Conversation:
        """
        Повертає існуючу сесію або створює нову разом з OpenAI Thread.
        Якщо переданий session_id не існує в БД — теж стартує нову сесію.
        """
        if session_id:
            try:
                return Conversation.objects.get(session_id=session_id)
            except Conversation.DoesNotExist:
                pass

        # Нова сесія: спочатку створюємо Thread у OpenAI, потім зберігаємо в БД
        thread_id = create_thread()
        new_session_id = "sess_" + uuid.uuid4().hex
        return Conversation.objects.create(
            session_id=new_session_id,
            openai_thread_id=thread_id,
        )
