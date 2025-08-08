from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.translation.trans_real import translation
from parler.models import TranslatableModel, TranslatedFields


class MainSliderItem(models.Model):
    """
    Represents an image used in the main page slider.

    This model stores a single banner image that appears in a carousel or
    slider on the website's homepage. Each record corresponds to one slide.
    """

    image = models.ImageField(upload_to="banners/",
                              verbose_name=_("Slider image"))

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


class Partner(TranslatableModel):
    """Represents partners displayed on the homepage."""
    translations = TranslatedFields(
        name=models.CharField(max_length=150, verbose_name=_("Name")),
    )
    image = models.ImageField(upload_to="partners/",
                              verbose_name=_("Partner image"))
    site_link = models.URLField(verbose_name=_("Site link"),
                                help_text=_("Link to partner site"))

    class Meta:
        verbose_name = _("Partner")
        verbose_name_plural = _("Partners")
        db_table = "Partner"

    def __str__(self):
        return _("Partner #%s") % self.pk


class FAQ(TranslatableModel):
    """Represents FAQ displayed on the homepage."""
    translations = TranslatedFields(
        question=models.CharField(max_length=255, verbose_name=_("Question")),
        answer=models.CharField(max_length=255, verbose_name=_("Answer")),
    )

    class Meta:
        verbose_name = _("FAQ")
        verbose_name_plural = _("FAQs")
        db_table = "FAQ"

    def __str__(self):
        return _("FAQ #%s") % self.pk


class Alumnus(TranslatableModel):
    """Represents alumnus object"""

    translations = TranslatedFields(
        full_name = models.CharField(max_length=255, verbose_name=_("Full name")),
        text = models.TextField(blank=True, verbose_name=_("About student")),
        major=models.CharField(max_length=50, verbose_name=_("Major")),
        degree = models.CharField(max_length=50, verbose_name=_("Degree")),
        workplace = models.CharField(max_length=255,blank=True, verbose_name=_("Workplace")),
        position = models.CharField(max_length=100,blank=True, verbose_name=_("Position")),
    )
    image = models.ImageField(upload_to="alumnus/",)
    links = models.JSONField(
            verbose_name=_("Social links or other publication"),
            blank=True,
            null=True,
            help_text=_("Structure like: {'instagram': 'link', 'telegram': 'link', 'facebook': 'link'}")
        )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created at"))
    date_of_graduation = models.DateField(verbose_name=_("Date of graduation"))

    class Meta:
        verbose_name = _("Alumnus")
        verbose_name_plural = _("Alumni")
        db_table = "Alumnus"
        ordering = ("-date_of_graduation",)
        indexes = [
            models.Index(fields=['date_of_graduation'],)]

    def __str__(self):
        return _("%s - #%s") % (self.safe_translation_getter('full_name', any_language=True), self.pk)


class AlumniSlider(models.Model):
    """
    Represents alumni slider displayed on the alumni page
    """
    image = models.ImageField(upload_to="alumni-slider/",)

    class Meta:
        verbose_name = _("Alumni slider item")
        verbose_name_plural = _("Alumni slider items")
        db_table = "AlumniSlider"

    def __str__(self):
        return _("Alumni slide #%s") % self.pk
