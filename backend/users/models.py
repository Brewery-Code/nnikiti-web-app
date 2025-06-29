from django.db import models
from django.contrib.auth.models import AbstractUser

from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Custom User model"""

    avatar = models.URLField(
        blank=True,
        null=True,
        verbose_name=_("Avatar"),
        help_text=_("Link to the user's avatar image"),
    )

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
