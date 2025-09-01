import datetime
import os

from django.db import models
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields
from mdeditor.fields import MDTextField
from parler.managers import TranslatableManager

from .validators import validate_rgba


def events_upload_to(instance, filename):
    """
    Returns a path like: events/yy.mm.dd/filename
    """
    date_str = datetime.date.today().strftime("%y.%m.%d")
    return os.path.join("events", date_str, filename)


class PublishedManager(TranslatableManager):
    def get_queryset(self):
        return super().get_queryset().filter(status=Event.Status.PUBLISHED)


class EventCategory(TranslatableModel):
    """
    Represents a specific event. Contains translatable title and body fields,
    and is associated with an EventsCategory.
    """

    translations = TranslatedFields(
        name=models.CharField(_("Event name"), max_length=100),
    )
    rgb_color = models.CharField(
        _("RGB color value"),
        max_length=20,
        validators=[validate_rgba],
        help_text=_(
            "Required RGBA color in format like (255,255,255,0.5) for client-side design"
        ),
    )
    created_at = models.DateTimeField(
        _("Creation date"), auto_now_add=True
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
        db_table = "event_category"

    def __str__(self) -> str:
        return _("Category #%s. %s") % (self.pk, self.name)


class Event(TranslatableModel):
    """
    Represents a specific event. Contains translatable title and body fields,
    and is associated with an EventsCategory.
    """

    class Status(models.TextChoices):
        DRAFT = "DF", _("Draft")
        PUBLISHED = "PB", _("Published")

    translations = TranslatedFields(
        title=models.CharField(_("Event title"),max_length=255),
        body=MDTextField(_("Event body")),
    )
    slug = models.SlugField(_("Event slug") ,blank=True, max_length=255)
    category = models.ForeignKey(
        EventCategory,
        on_delete=models.CASCADE,
        related_name="events",
        verbose_name=_("Category"),
    )
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.DRAFT,
        verbose_name=_("Status"),
    )
    created_at = models.DateTimeField(
        _("Creation date"),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(_("Last updated"), auto_now=True)
    objects = TranslatableManager()
    published = PublishedManager()

    class Meta:
        verbose_name = _("Event")
        verbose_name_plural = _("Events")
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["created_at",])
        ]
        db_table = "event"

    def __str__(self) -> str:
        return _("Event #%s. Title: %s") % (self.pk, self.title)


class EventImage(models.Model):
    """
    Represents an image associated with a specific event.
    Images are uploaded to a date-structured subfolder within an 'events' directory.
    """

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name=_("Event"),
    )
    image = models.ImageField(_("Image"), upload_to=events_upload_to)
    uploaded_at = models.DateTimeField(_("Uploaded at"), auto_now_add=True)

    class Meta:
        verbose_name = _("Event image")
        verbose_name_plural = _("Events images")
        db_table = "event_image"

    def __str__(self) -> str:
        return _("Image for event #%s") % self.event.pk
