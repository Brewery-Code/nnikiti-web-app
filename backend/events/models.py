import datetime
import os

from django.db import models
from django.utils.text import slugify
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
        return super().get_queryset().filter(status=Events.Status.PUBLISHED)


class EventsCategory(TranslatableModel):
    """
    Represents a specific event. Contains translatable title and body fields,
    and is associated with an EventsCategory.
    """

    translations = TranslatedFields(
        name=models.CharField(max_length=100, verbose_name=_("Event name")),
    )
    rgb_color = models.CharField(
        max_length=20,
        validators=[validate_rgba],
        verbose_name=_("RGB color value"),
        help_text=_(
            "Required RGBA color in format like (255,255,255,0.5) for client-side design"
        ),
    )
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name=_("Creation date")
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
        db_table = "EventsCategory"

    def __str__(self) -> str:
        return _("Category #%s. %s") % (self.pk, self.name)


class Events(TranslatableModel):
    """
    Represents a specific event. Contains translatable title and body fields,
    and is associated with an EventsCategory.
    """

    class Status(models.TextChoices):
        DRAFT = "DF", _("Draft")
        PUBLISHED = "PB", _("Published")

    translations = TranslatedFields(
        title=models.CharField(max_length=255, verbose_name=_("Event title")),
        body=MDTextField(verbose_name=_("Event body")),
    )
    slug = models.SlugField(blank=True, max_length=255, verbose_name=_("Event slug"))
    category = models.ForeignKey(
        EventsCategory,
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
        auto_now_add=True, verbose_name=_("Creation date")
    )
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Last updated"))
    objects = TranslatableManager()
    published = PublishedManager()

    class Meta:
        verbose_name = _("Event")
        verbose_name_plural = _("Events")
        ordering = ["-created_at"]
        db_table = "Events"

    def __str__(self) -> str:
        return _("Event #%s. Title: %s") % (self.pk, self.title)


class EventsImage(models.Model):
    """
    Represents an image associated with a specific event.
    Images are uploaded to a date-structured subfolder within an 'events' directory.
    """

    event = models.ForeignKey(
        Events,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name=_("Event"),
    )
    image = models.ImageField(upload_to=events_upload_to, verbose_name=_("Image"))
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Uploaded at"))

    class Meta:
        verbose_name = _("Event image")
        verbose_name_plural = _("Events images")
        db_table = "EventsImage"

    def __str__(self) -> str:
        return _("Image for event #%s") % self.event.pk
