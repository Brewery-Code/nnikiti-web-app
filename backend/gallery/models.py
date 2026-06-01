from django.db import models
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields

from core.utils import make_upload_to


class Album(TranslatableModel):

    class Status(models.TextChoices):
        DRAFT = "DF", _("Draft")
        PUBLISHED = "PB", _("Published")

    translations = TranslatedFields(
        title=models.CharField(max_length=255, verbose_name=_("Title")),
        description=models.TextField(blank=True, verbose_name=_("Description")),
    )
    cover = models.ImageField(
        upload_to=make_upload_to("gallery/covers"),
        blank=True,
        verbose_name=_("Cover"),
    )
    date = models.DateField(verbose_name=_("Date"))
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.DRAFT,
        verbose_name=_("Status"),
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Album")
        verbose_name_plural = _("Albums")
        db_table = "Album"
        ordering = ["-date"]

    def __str__(self):
        return self.safe_translation_getter("title", any_language=True) or f"Album #{self.pk}"


class AlbumPhoto(models.Model):

    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE,
        related_name="photos",
        verbose_name=_("Album"),
    )
    image = models.ImageField(
        upload_to=make_upload_to("gallery/photos"),
        verbose_name=_("Photo"),
    )
    published_at = models.DateField(verbose_name=_("Published at"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Order"))

    class Meta:
        verbose_name = _("Photo")
        verbose_name_plural = _("Photos")
        db_table = "AlbumPhoto"
        ordering = ["order", "published_at"]

    def __str__(self):
        return f"Photo #{self.pk} — {self.album}"
