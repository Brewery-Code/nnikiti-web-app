from django.contrib import admin

from .models import MainSliderItem


@admin.register(MainSliderItem)
class MainSliderItemAdmin(admin.ModelAdmin):
    """Admin configuration for the MainSliderItem model."""

    list_display = ("pk",)
    list_display_links = ("pk",)
