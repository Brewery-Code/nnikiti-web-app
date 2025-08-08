from rest_framework import serializers

from .models import MainSliderItem, StatisticBlock, Partner, FAQ, Alumnus


class MainSliderItemSerializer(serializers.ModelSerializer):
    """Serializer for the MainSliderItem model."""

    class Meta:
        model = MainSliderItem
        fields = ["image"]


class StatisticBlockSerializer(serializers.ModelSerializer):
    """Serializer for the StatisticBlock model."""

    class Meta:
        model = StatisticBlock
        fields = ["id", "start_value", "order", "title", "description"]


class PartnersSerializer(serializers.ModelSerializer):
    """Serializer for the Partners model."""

    class Meta:
        model = Partner
        fields = ["id", "name", "image", "site_link"]


class FAQSerializer(serializers.ModelSerializer):
    """Serializer for the FAQ model."""
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer"]


class AlumnusSerializer(serializers.ModelSerializer):
    """Serializer for the Alumnus model."""
    class Meta:
        model = Alumnus
        fields = ["id", "full_name", "text", "date_of_graduation", "created_at", "links", "image", "major", "degree",
                  "workplace", "position"]


class AlumniSliderSerializer(serializers.ModelSerializer):
    """Serializer for the AlumniSlider model."""
    class Meta:
        model = Alumnus
        fields = ["id", "image"]