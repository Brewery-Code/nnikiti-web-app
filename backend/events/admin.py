from django.contrib import admin
from django import forms
from parler.admin import TranslatableAdmin
from parler.forms import TranslatableModelForm
from mdeditor.widgets import MDEditorWidget

from .models import EventCategory, EventImage, Event


@admin.register(EventCategory)
class EventCategoryAdmin(TranslatableAdmin):
    """Admin configuration for the EventsCategory model."""

    list_display = ["id", "name"]


class EventImageInline(admin.TabularInline):
    """Inline editing for images related to an event."""

    model = EventImage
    extra = 1


class EventAdminForm(TranslatableModelForm):
    """Custom admin form for an Events model using the MDEditor widget."""

    class Meta:
        model = Event
        fields = "__all__"
        widgets = {
            "body": MDEditorWidget(),
        }


@admin.register(Event)
class EventsAdmin(TranslatableAdmin):
    """Admin configuration for the Events model."""

    form = EventAdminForm

    list_display = ["id", "title", "slug", "category", "status", "created_at"]
    readonly_fields = ["slug",]
    list_filter = [
        "status",
    ]
    inlines = [EventImageInline]
