import markdown
from rest_framework import serializers

from .models import Events, EventsCategory


class EventsCategorySerializer(serializers.ModelSerializer):
    """Serializer for EventsCategory objects"""

    class Meta:
        model = EventsCategory
        fields = ["id", "name", "rgb_color"]


class EventsSerializer(serializers.ModelSerializer):
    """Serializer for an Events objects"""

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
        """Return the HTML body of the event"""
        return markdown.markdown(
            obj.body or "",
            extensions=[
                "markdown.extensions.extra",
                "markdown.extensions.codehilite",
            ],
        )
