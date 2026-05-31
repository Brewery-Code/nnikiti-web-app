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
    site_url = serializers.URLField(source="site_link")

    class Meta:
        model = Partner
        fields = ["id", "name", "image", "site_url"]


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


class AlumnusCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating alumnus (Ukrainian translation only)"""
    full_name = serializers.CharField(write_only=True)
    text = serializers.CharField(write_only=True, required=False)
    major = serializers.CharField(write_only=True)
    degree = serializers.CharField(write_only=True)
    workplace = serializers.CharField(write_only=True, required=False)
    position = serializers.CharField(write_only=True, required=False)
    image = serializers.ImageField()
    date_of_graduation = serializers.DateField()
    links = serializers.JSONField(required=False)

    class Meta:
        model = Alumnus
        fields = ('full_name', 'text', 'major', 'degree', 'workplace', 'position', 'image', 'links', 'date_of_graduation')

    def create(self, validated_data):
        translations_data = {
            'full_name': validated_data.pop('full_name'),
            'text': validated_data.pop('text', ''),
            'major': validated_data.pop('major'),
            'degree': validated_data.pop('degree'),
            'workplace': validated_data.pop('workplace', ''),
            'position': validated_data.pop('position', ''),
        }

        alumnus = Alumnus(**validated_data)
        alumnus.save()

        alumnus.set_current_language('uk')
        for field, value in translations_data.items():
            setattr(alumnus, field, value)
        alumnus.save()

        return alumnus
