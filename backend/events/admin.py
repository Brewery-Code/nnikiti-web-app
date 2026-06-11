from django.contrib import admin
from django import forms
from parler.admin import TranslatableAdmin
from parler.forms import TranslatableModelForm
from mdeditor.widgets import MDEditorWidget
from unfold.admin import ModelAdmin, TabularInline

from .models import EventCategory, EventImage, Event


class UnfoldTranslatableAdmin(ModelAdmin, TranslatableAdmin):
    pass


@admin.register(EventCategory)
class EventCategoryAdmin(UnfoldTranslatableAdmin):
    """Admin configuration for the EventsCategory model."""
    list_display = ["id", "name"]
    list_display_links = ["id", "name"]


class EventImageInline(TabularInline):
    """Inline editing for images related to an event."""
    model = EventImage
    extra = 1


class EventAdminForm(TranslatableModelForm):
    """Custom admin form for an Events model using the MDEditor widget."""
    create_gallery = forms.BooleanField(
        required=False,
        label="Створити галерею з фото події",
        help_text="Автоматично створить альбом в галереї з назвою події та додасть всі фото події",
    )

    class Meta:
        model = Event
        fields = "__all__"
        widgets = {
            "body": MDEditorWidget(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk and self.instance.album_id:
            self.fields['create_gallery'].initial = True
            self.fields['create_gallery'].help_text = (
                "Альбом вже створено. Зняття галочки не видалить альбом."
            )


@admin.register(Event)
class EventsAdmin(UnfoldTranslatableAdmin):
    """Admin configuration for the Events model."""
    form = EventAdminForm
    list_display = ["id", "title", "slug", "category", "status", "created_at"]
    list_display_links = ["id", "title"]
    readonly_fields = ["slug"]
    list_filter = ["status"]
    inlines = [EventImageInline]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        request._create_gallery_for_event = form.cleaned_data.get('create_gallery', False)

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        if getattr(request, '_create_gallery_for_event', False):
            del request._create_gallery_for_event
            event = Event.objects.get(pk=form.instance.pk)
            if not event.album_id:
                self._create_gallery_from_event(event)

    def _create_gallery_from_event(self, event):
        from gallery.models import Album, AlbumPhoto
        import datetime

        title = event.safe_translation_getter('title', any_language=True) or f"Подія #{event.pk}"
        date = event.event_date or datetime.date.today()

        album = Album()
        album.date = date
        album.status = Album.Status.PUBLISHED
        if event.cover:
            album.cover = event.cover.name
        album.save()
        album.set_current_language('uk')
        album.title = title
        album.description = ''
        album.save()

        order = 0
        if event.cover:
            AlbumPhoto.objects.create(
                album=album,
                image=event.cover.name,
                published_at=date,
                order=order,
            )
            order += 1

        for event_image in event.images.all():
            AlbumPhoto.objects.create(
                album=album,
                image=event_image.image.name,
                published_at=date,
                order=order,
            )
            order += 1

        event.album = album
        event.save(update_fields=['album'])
