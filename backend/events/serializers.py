import markdown
from rest_framework import serializers

from .models import Events, EventsCategory


class EventsCategorySerializer(serializers.ModelSerializer):
    """--"""

    class Meta:
        model = EventsCategory
        fields = ["id", "name", "rgb_color"]


class EventsSerializer(serializers.ModelSerializer):
    """--"""

    body_html = serializers.SerializerMethodField()
    category = EventsCategorySerializer()

    class Meta:
        model = Events
        fields = [
            "id",
            "title",
            "slug",
            "body",
            "body_html",
            "category",
            "created_at",
            "updated_at",
        ]

    def get_body_html(self, obj):
        return markdown.markdown(
            obj.body or "",
            extensions=[
                "markdown.extensions.extra",
                "markdown.extensions.codehilite",
            ],
        )
