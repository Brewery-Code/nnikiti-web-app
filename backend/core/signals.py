from django.db.models.signals import post_delete
from django.dispatch import receiver

from .models import MainSliderItem, Partner, Alumnus


@receiver(post_delete, sender=MainSliderItem)
def delete_main_slider_image(sender, instance, **kwargs):
    """
    Automatically deletes the image file from
    storage when a MainSliderItem is deleted.
    """
    if instance.image:
        instance.image.delete(save=False)


@receiver(post_delete, sender=Partner)
def delete_partner_images(sender, instance, **kwargs):
    """Automatically deletes the image file from
    storage when a Partners is deleted.
    """
    if instance.image:
        instance.image.delete(save=False)


@receiver(post_delete, sender=Alumnus)
def delete_alumnus_images(sender, instance, **kwargs):
    """
    Automatically deletes the image file from
    storage when an Alumnus is deleted.
    """
    if instance.image:
        instance.image.delete(save=False)