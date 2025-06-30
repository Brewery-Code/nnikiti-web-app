from django.contrib import admin
from django import forms
from parler.admin import TranslatableAdmin
from parler.forms import TranslatableModelForm
from mdeditor.widgets import MDEditorWidget

from .models import EventsCategory, EventsImage, Events


@admin.register(EventsCategory)
class EventsCategoryAdmin(TranslatableAdmin):
    """Admin configuration for the EventsCategory model."""

    list_display = ["id", "name"]


class EventsImageInline(admin.TabularInline):
    """Inline editing for images related to an event."""

    model = EventsImage
    extra = 1


class EventsAdminForm(TranslatableModelForm):
    """Custom admin form for Events model using the MDEditor widget."""

    class Meta:
        model = Events
        fields = "__all__"
        widgets = {
            "body": MDEditorWidget(),
        }


@admin.register(Events)
class EventsAdmin(TranslatableAdmin):
    """Admin configuration for the Events model."""

    form = EventsAdminForm

    list_display = ["id", "title", "category", "created_at"]
    inlines = [EventsImageInline]
