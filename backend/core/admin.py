from django.contrib import admin

from .models import MainSliderItem


@admin.register(MainSliderItem)
class MainSliderItemAdmin(admin.ModelAdmin):
    """Адмін-панель для моделі MainSliderItem"""

    list_display = ("pk",)
    list_display_links = ("pk",)
