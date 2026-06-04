from rest_framework import serializers

from .models import MainSliderItem, StatisticBlock, Partner, FAQ, Alumnus, AlumniSlider


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
        model = AlumniSlider
        fields = ["id", "image"]


class AlumnusCreateSerializer(serializers.Serializer):
    """Serializer for creating alumnus from the public form."""
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    graduation_year = serializers.IntegerField(min_value=1990, max_value=2100)
    major = serializers.CharField(max_length=50)
    text = serializers.CharField(required=False, allow_blank=True, default='')
    image = serializers.ImageField(required=False)

    def create(self, validated_data):
        import datetime
        full_name = f"{validated_data['last_name']} {validated_data['first_name']}"
        year = validated_data['graduation_year']
        date_of_graduation = datetime.date(year, 6, 30)

        alumnus = Alumnus(
            date_of_graduation=date_of_graduation,
            status=Alumnus.Status.DRAFT,
        )
        if validated_data.get('image'):
            alumnus.image = validated_data['image']
        alumnus.save()

        alumnus.set_current_language('uk')
        alumnus.full_name = full_name
        alumnus.major = validated_data['major']
        alumnus.text = validated_data.get('text', '')
        alumnus.degree = ''
        alumnus.save()

        return alumnus
