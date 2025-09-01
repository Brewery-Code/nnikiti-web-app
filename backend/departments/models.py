from django.db import models
from django.utils.translation import gettext_lazy as _

from parler.models import TranslatableModel, TranslatedFields


class Department(TranslatableModel):
    """
    Department model
    """
    translations = TranslatedFields(
        name = models.CharField(_("Department name"), max_length=255),
        description = models.TextField(_("Department description")),
        address = models.CharField(_("Department address"), max_length=255),
    )
    email_of_department = models.EmailField(_("Email of department"), max_length=255)
    date_of_establishment = models.DateField(_("Date of establishment"))
    department_website = models.URLField(_("Department website"), blank=True)

    class Meta:
        verbose_name = _("Department")
        verbose_name_plural = _("Departments")
        db_table = "department"

    def __str__(self):
        return self.name

class DepartmentImage(models.Model):
    """
    DepartmentImage model
    """

    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="images", verbose_name=_("Department"))
    image = models.ImageField(_("Department image"), upload_to="departments/images/")

    class Meta:
        verbose_name = _("Department image")
        verbose_name_plural = _("Department images")
        db_table = "department_image"

    def __str__(self):
        return self.pk

class DepartmentSocialLink(models.Model):
    """
    DepartmentSocialLink model
    """
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="social_links", verbose_name=_("Department"))
    name = models.CharField(_("The name of the social network"), max_length=255)
    url = models.URLField(_("URL of the social network"))

    class Meta:
        verbose_name = _("Department social link")
        verbose_name_plural = _("Department social links")
        db_table = "department_social_link"

    def __str__(self):
        return self.name

class HeadOfDepartment(TranslatableModel):
    """
    HeadOfDepartment model
    """
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="heads", verbose_name=_("Department"))
    translations = TranslatedFields(
        full_name = models.CharField(_("Full name"), max_length=255),
        regalia = models.CharField(_("Regalia"), max_length=255),
    )
    email = models.EmailField(_("Email"), max_length=255)
    audience = models.CharField(_("Audience"), max_length=255)

    class Meta:
        verbose_name = _("Head of department")
        verbose_name_plural = _("Head of departments")
        db_table = "head_of_department"

    def __str__(self):
        return self.full_name

class EducationalProgram(TranslatableModel):
    """
    EducationalProgram model
    """
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="programs", verbose_name=_("Department"))
    translations = TranslatedFields(
        name = models.CharField(_("Name"), max_length=255),
        description = models.TextField(_("Description")),
    )
    code = models.CharField(_("Code"), max_length=255)
    subject = models.ManyToManyField("Subject", related_name="subjects", verbose_name=_("Subject"))
    levels = models.ManyToManyField("EducationalProgramLevel", related_name="levels", verbose_name=_("Levels"))
    study_form = models.ManyToManyField("StudyForm", related_name="study_forms", verbose_name=_("Study form"))

    class Meta:
        verbose_name = _("Educational program")
        verbose_name_plural = _("Educational programs")
        db_table = "educational_program"

    def __str__(self):
        return self.name

class EducationalProgramLevel(TranslatableModel):
    """
    EducationalProgramLevel model
    """
    translations = TranslatedFields(
        name = models.CharField(_("Name"), max_length=255),
    )

    class Meta:
        verbose_name = _("Educational program level")
        verbose_name_plural = _("Educational program levels")
        db_table = "educational_program_level"

    def __str__(self):
        return self.name

class StudyForm(TranslatableModel):
    """
    StudyForm model
    """
    translations = TranslatedFields(
        name=models.CharField(_("Name"), max_length=255),
    )

    class Meta:
        verbose_name = _("Study form")
        verbose_name_plural = _("Study forms")
        db_table = "study_form"

    def __str__(self):
        return self.name

class Subject(TranslatableModel):
    """
    Subject model
    """
    translations = TranslatedFields(
        name=models.CharField(_("Name"), max_length=255),
    )

    class Meta:
        verbose_name = _("Subject")
        verbose_name_plural = _("Subjects")
        db_table = "subject"

    def __str__(self):
        return self.name