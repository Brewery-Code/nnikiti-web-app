from django.db import models
from django.contrib.auth.models import AbstractUser

from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Custom User model"""

    class Role(models.TextChoices):
        STUDENT = "ST", _("Student")
        TEACHER = "TE", _("Teacher")
        GUEST = "GU", _("Guest")
        DATA_OPERATOR = "OP", _("Data Operator")

    avatar = models.URLField(
        blank=True,
        null=True,
        verbose_name=_("Avatar"),
        help_text=_("Link to the user's avatar image"),
    )
    role = models.CharField(max_length=2, choices=Role.choices, default=Role.GUEST ,verbose_name=_("Role"))


    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        db_table = "User"
