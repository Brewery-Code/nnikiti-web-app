from rest_framework import serializers

from .models import MainSliderItem


class MainSliderItemSerializer(serializers.ModelSerializer):
    """Серіалізатор моделі ModelSliderItem"""

    class Meta:
        model = MainSliderItem
        fields = ["image"]
