from django.db.models.signals import post_delete
from django.dispatch import receiver

from .models import MainSliderItem


@receiver(post_delete, sender=MainSliderItem)
def delete_main_slider_image(sender, instance, **kwargs):
    """
    Automatically deletes the image file from
    storage when a MainSliderItem is deleted.
    """
    if instance.image:
        instance.image.delete(save=False)
