from django.db import models


class MainSliderItem(models.Model):
    """
    Represents an image used in the main page slider.

    This model stores a single banner image that appears in a carousel or
    slider on the website's homepage. Each record corresponds to one slide.
    """

    image = models.ImageField(upload_to="banners/")

    class Meta:
        verbose_name = "Slider item"
        verbose_name_plural = "Slider items"
        db_table = "MainSliderItem"

    def __str__(self):
        return f"Slide #{self.pk}"
