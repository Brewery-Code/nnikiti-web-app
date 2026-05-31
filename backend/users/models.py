import logging

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.conf import settings


logger = logging.getLogger(__name__)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            logger.error("Trying to create a user without an email address")
            raise ValueError("Users must have an email address")
        if password is None:
            logger.error("Trying to create a user without a password")
            raise ValueError("Users must have a password")

        logger.info("Creating a user with email address: %s" % email)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        logger.info("User with email address: %s, was successfully created. His ID: %s" % (user.email, user.pk))
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        logger.info(f"Creating superuser with email: {email}")

        extra_fields["is_staff"] = True
        extra_fields["is_superuser"] = True
        extra_fields["role"] = User.Role.ADMIN

        if extra_fields.get("is_staff") is not True:
            logger.error("Trying to create a superuser with is_staff=False")
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            logger.error("Trying to create a superuser with is_superuser=False")
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model.
    """
    class Role(models.TextChoices):
        STUDENT = "ST", _("Student")
        TEACHER = "TE", _("Teacher")
        DATA_OPERATOR = "OP", _("Data Operator")
        ADMIN = "AD", _("Administrator")

    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(_("first name"), max_length=150)
    last_name = models.CharField(_("last name"), max_length=150)
    avatar = models.URLField(_("avatar url"), blank=True, null=True)
    role = models.CharField(_("user role"), max_length=2, choices=Role.choices, default=Role.STUDENT)
    is_staff = models.BooleanField(_("staff status"), default=False, help_text=_("Designates whether the user can log "
                                                                                 "into this admin site."))
    is_active = models.BooleanField(
        _("is active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active."
            "Unselect this instead of deleting accounts."
        ))
    is_superuser = models.BooleanField(_("superuser status"), default=False)
    department = models.ForeignKey(
        "departments.Department",
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name=_("Department"),
        related_name="admins",
    )
    date_joined = models.DateTimeField(_("date joined"), auto_now_add=True)
    last_login = models.DateTimeField(_("last login"), auto_now=True)
    updated_at = models.DateTimeField(_("last updated"), auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]
    EMAIL_FIELD = "email"

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        db_table = "users"

    @property
    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def __str__(self):
        return "User №: %s. %s" % (self.pk, self.get_full_name)

