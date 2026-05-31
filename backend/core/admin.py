from django.contrib import admin
from parler.admin import TranslatableAdmin
from unfold.admin import ModelAdmin, TabularInline

from .models import MainSliderItem, StatisticBlock, Partner, FAQ, Alumnus, AlumniSlider


class UnfoldTranslatableAdmin(ModelAdmin, TranslatableAdmin):
    pass


@admin.register(MainSliderItem)
class MainSliderItemAdmin(ModelAdmin):
    """Admin configuration for the MainSliderItem model."""
    list_display = ("pk",)
    list_display_links = ("pk",)


@admin.register(StatisticBlock)
class StatisticBlockAdmin(UnfoldTranslatableAdmin):
    """Admin configuration for the StatisticBlock model."""
    list_display = ["id", "title", "description"]


@admin.register(Partner)
class PartnersAdmin(UnfoldTranslatableAdmin):
    """Admin configuration for the Partners model."""
    list_display = ["id", "name"]


@admin.register(FAQ)
class FAQAdmin(UnfoldTranslatableAdmin):
    """Admin configuration for the FAQ model."""
    list_display = ["id", "question", "answer"]


@admin.register(Alumnus)
class AlumnusAdmin(UnfoldTranslatableAdmin):
    """Admin configuration for the Alumnus model."""
    list_display = ["id", "full_name"]


@admin.register(AlumniSlider)
class AlumniSliderAdmin(ModelAdmin):
    """Admin configuration for the AlumniSlider model."""
    list_display = ["pk"]
    list_display_links = ("pk",)
