from django.db import models
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields


class MainSliderItem(models.Model):
    """
    Represents an image used in the main page slider.

    This model stores a single banner image that appears in a carousel or
    slider on the website's homepage. Each record corresponds to one slide.
    """

    image = models.ImageField(_("Slider image"),upload_to="core/banners/",)

    class Meta:
        verbose_name = _("Slider item")
        verbose_name_plural = _("Slider items")
        db_table = "main_slider_item"

    def __str__(self):
        return _("Slide #%s") % self.pk


class StatisticBlock(TranslatableModel):
    """Represents a numeric/statistical block displayed on the homepage."""
    translations = TranslatedFields(
        title=models.CharField(_("Title"),max_length=150),
        description=models.TextField(_("Description"), blank=True),
    )
    start_value = models.IntegerField(
        _("Start value"),
        blank=True,
        null=True,
        help_text=_("Values for proper animation operation"),
    )
    order = models.PositiveIntegerField(
        _("Order item"),
        help_text=_("Determines yhe order in which elements will be passed"),
    )

    class Meta:
        verbose_name = _("Statistic block item")
        verbose_name_plural = _("Statistic block items")
        db_table = "statistic_block"

    def __str__(self):
        return _("Statistic block item #%s") % self.pk


class Partner(TranslatableModel):
    """Represents partners displayed on the homepage."""
    translations = TranslatedFields(
        name = models.CharField(_("Name"),max_length=150),
    )
    image = models.ImageField(_("Partner image"),upload_to="core/partners/",)
    site_link = models.URLField(_("Site link"),
                                help_text=_("Link to partner site"))

    class Meta:
        verbose_name = _("Partner")
        verbose_name_plural = _("Partners")
        db_table = "partner"

    def __str__(self):
        return _("Partner #%s") % self.pk


class FAQ(TranslatableModel):
    """Represents FAQ displayed on the homepage."""
    translations = TranslatedFields(
        question=models.CharField(_("Question"), max_length=255),
        answer=models.CharField(_("Answer"), max_length=255),
    )

    class Meta:
        verbose_name = _("FAQ")
        verbose_name_plural = _("FAQs")
        db_table = "faq"

    def __str__(self):
        return _("FAQ #%s") % self.pk


class Alumnus(TranslatableModel):
    """Represents alumnus object"""

    translations = TranslatedFields(
        full_name = models.CharField(_("Full name"), max_length=255),
        text = models.TextField(_("About student"), blank=True),
        major=models.CharField(_("Major"), max_length=50),
        degree = models.CharField(_("Degree"), max_length=50),
        workplace = models.CharField(_("Workplace"), max_length=255,blank=True),
        position = models.CharField(_("Position"), max_length=100,blank=True),
    )
    image = models.ImageField(upload_to="core/alumnus/",)
    links = models.JSONField(
            _("Social links or other publication"),
            blank=True,
            null=True,
            help_text=_("Structure like: {'instagram': 'link', 'telegram': 'link', 'facebook': 'link'}")
        )
    created_at = models.DateTimeField(_("Created at"),auto_now_add=True)
    date_of_graduation = models.DateField(_("Date of graduation"))

    class Meta:
        verbose_name = _("Alumnus")
        verbose_name_plural = _("Alumni")
        db_table = "alumnus"
        ordering = ("-date_of_graduation",)
        indexes = [
            models.Index(fields=['date_of_graduation'],)]

    def __str__(self):
        return _("%s - #%s") % (self.safe_translation_getter('full_name', any_language=True), self.pk)


class AlumniSlider(models.Model):
    """
    Represents alumni slider displayed on the alumni page
    """
    image = models.ImageField(upload_to="core/alumni-slider/",)

    class Meta:
        verbose_name = _("Alumni slider item")
        verbose_name_plural = _("Alumni slider items")
        db_table = "alumni_slider"

    def __str__(self):
        return _("Alumni slide #%s") % self.pk
