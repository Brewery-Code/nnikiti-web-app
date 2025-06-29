from rest_framework import serializers

from .models import MainSliderItem, StatisticBlock


class MainSliderItemSerializer(serializers.ModelSerializer):
    """Serializer for the MainSliderItem model."""

    class Meta:
        model = MainSliderItem
        fields = ["image"]


class StatisticBlockSerializer(serializers.ModelSerializer):
    """Serializer for the StatistickBlock model."""

    class Meta:
        model = StatisticBlock
        fields = ["id", "start_value", "order", "title", "description"]
