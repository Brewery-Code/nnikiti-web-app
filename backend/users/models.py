from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """Custom User model"""

    avatar = models.URLField(blank=True, null=True)
