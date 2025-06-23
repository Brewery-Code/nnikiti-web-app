from django.db import models


class MainSliderItem(models.Model):
    """
    Модель для зберігання фото до слайдера головної сторінки
    """

    image = models.ImageField(upload_to="banners/")

    class Meta:
        verbose_name = "Slider item"
        verbose_name_plural = "Slider items"
        db_table = "MainSliderItem"

    def __str__(self):
        return f"Slide #{self.pk}"
