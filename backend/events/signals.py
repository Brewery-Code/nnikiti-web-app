from unidecode import unidecode

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify

from .models import Event

@receiver(post_save, sender=Event)
def generate_slug_after_translation(sender, instance, **kwargs):
    """
    Automatically generates a slug after the event is created
    """
    if not instance.slug:
        uk_title = instance.safe_translation_getter("title", language_code="uk")
        if uk_title:
            base_slug = f"{uk_title}-{instance.pk}"
            instance.slug = slugify(unidecode(base_slug))[:255]
            instance.save(update_fields=["slug"])

