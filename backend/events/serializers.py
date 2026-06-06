import markdown
from rest_framework import serializers

from .models import Event, EventCategory, EventImage


class EventsCategorySerializer(serializers.ModelSerializer):
    """Serializer for EventsCategory objects"""

    class Meta:
        model = EventCategory
        fields = ["id", "name", "rgb_color"]


class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ["id", "image"]


class EventsSerializer(serializers.ModelSerializer):
    """Serializer for an Events objects"""

    body_html = serializers.SerializerMethodField()
    category = EventsCategorySerializer()
    images = EventImageSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "slug",
            "body",
            "body_html",
            "cover",
            "images",
            "event_date",
            "location",
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
