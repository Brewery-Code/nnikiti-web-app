from django.contrib import admin
from parler.admin import TranslatableAdmin

from .models import MainSliderItem, StatisticBlock


@admin.register(MainSliderItem)
class MainSliderItemAdmin(admin.ModelAdmin):
    """Admin configuration for the MainSliderItem model."""

    list_display = ("pk",)
    list_display_links = ("pk",)


@admin.register(StatisticBlock)
class StatisticBlockAdmin(TranslatableAdmin):
    """Admin configuration for the StatisticBlock model."""

    list_display = ["id", "title", "description"]
