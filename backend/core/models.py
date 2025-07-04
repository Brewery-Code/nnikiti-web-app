from django.db import models
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields


class MainSliderItem(models.Model):
    """
    Represents an image used in the main page slider.

    This model stores a single banner image that appears in a carousel or
    slider on the website's homepage. Each record corresponds to one slide.
    """

    image = models.ImageField(upload_to="banners/", verbose_name=_("Slider image"))

    class Meta:
        verbose_name = _("Slider item")
        verbose_name_plural = _("Slider items")
        db_table = "MainSliderItem"

    def __str__(self):
        return _("Slide #%s") % self.pk


class StatisticBlock(TranslatableModel):
    """Represents a numeric/statistical block displayed on the homepage."""
    translations = TranslatedFields(
        title=models.CharField(max_length=150, verbose_name=_("Title")),
        description=models.TextField(blank=True, verbose_name=_("Description")),
    )
    start_value = models.IntegerField(
        blank=True,
        null=True,
        verbose_name=_("Start value"),
        help_text=_("Values for proper animation operation"),
    )
    order = models.PositiveIntegerField(
        verbose_name=_("Order item"),
        help_text=_("Determines yhe order in which elements will be passed"),
    )

    class Meta:
        verbose_name = _("Statistic block item")
        verbose_name_plural = _("Statistic block items")
        db_table = "StatistickBlock"

    def __str__(self):
        return _("Statistic block item #%s") % self.pk


class Partners(TranslatableModel):
    """Represents partners displayed on the homepage."""
    translations = TranslatedFields(
        name=models.CharField(max_length=150, verbose_name=_("Name")),
    )
    image = models.ImageField(upload_to="partners/", verbose_name=_("Partner image"))
    site_link = models.URLField(verbose_name=_("Site link"), help_text=_("Link to partner site"))

    class Meta:
        verbose_name = _("Partner")
        verbose_name_plural = _("Partners")
        db_table = "Partner"

    def __str__(self):
        return _("Partner #%s") % self.pk