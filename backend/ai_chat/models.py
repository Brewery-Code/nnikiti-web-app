import uuid
from django.db import models


class Conversation(models.Model):
    """Сесія чату одного користувача. Прив'язана до OpenAI Thread."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session_id = models.CharField(max_length=64, unique=True, db_index=True)
    openai_thread_id = models.CharField(max_length=128, null=True, blank=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "ai_chat_conversations"
        ordering = ["-last_activity_at"]

    def __str__(self):
        return f"Conversation {self.session_id}"


class Message(models.Model):
    class Role(models.TextChoices):
        USER = "user", "User"
        ASSISTANT = "assistant", "Assistant"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    role = models.CharField(max_length=16, choices=Role.choices)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "ai_chat_messages"
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.role}: {self.text[:60]}"
