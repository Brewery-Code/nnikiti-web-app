import uuid
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Conversation",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("session_id", models.CharField(db_index=True, max_length=64, unique=True)),
                ("openai_thread_id", models.CharField(blank=True, max_length=128, null=True, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("last_activity_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "db_table": "ai_chat_conversations",
                "ordering": ["-last_activity_at"],
            },
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                (
                    "conversation",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="messages",
                        to="ai_chat.conversation",
                    ),
                ),
                (
                    "role",
                    models.CharField(
                        choices=[("user", "User"), ("assistant", "Assistant")],
                        max_length=16,
                    ),
                ),
                ("text", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "db_table": "ai_chat_messages",
                "ordering": ["created_at"],
            },
        ),
    ]
