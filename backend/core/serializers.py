from rest_framework import serializers

from .models import MainSliderItem


class MainSliderItemSerializer(serializers.ModelSerializer):
    """Serializer for the MainSliderItem model."""

    class Meta:
        model = MainSliderItem
        fields = ["image"]
