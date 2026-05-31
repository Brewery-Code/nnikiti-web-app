from django.utils.translation import gettext_lazy as _
from taggit.managers import TaggableManager

from .tagged import *


class FacultyMember(models.Model):
    """Represents a faculty member (teacher) of a department."""

    department = models.ForeignKey(
        "Department", on_delete=models.CASCADE, related_name="team",
        verbose_name=_("Department")
    )
    name_uk = models.CharField(max_length=255, default='', verbose_name=_("Full name (UK)"))
    name_en = models.CharField(max_length=255, blank=True, default='', verbose_name=_("Full name (EN)"))
    role_uk = models.CharField(max_length=255, default='', verbose_name=_("Role (UK)"))
    role_en = models.CharField(max_length=255, blank=True, default='', verbose_name=_("Role (EN)"))
    specialty_uk = models.CharField(max_length=255, blank=True, default='', verbose_name=_("Specialty (UK)"))
    specialty_en = models.CharField(max_length=255, blank=True, default='', verbose_name=_("Specialty (EN)"))
    image = models.ImageField(upload_to="faculty/", blank=True, verbose_name=_("Photo"))
    email = models.EmailField(blank=True, verbose_name=_("Email"))
    audience = models.CharField(max_length=64, blank=True, verbose_name=_("Audience"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Order"))

    class Meta:
        verbose_name = _("Faculty Member")
        verbose_name_plural = _("Faculty Members")
        db_table = "FacultyMember"
        ordering = ["order"]

    def __str__(self):
        return self.name_uk or f"FacultyMember #{self.pk}"


class DepartmentHistory(TranslatableModel):
    """Represents a historical event in the department's timeline."""

    translations = TranslatedFields(
        year=models.CharField(max_length=64, verbose_name=_("Year")),
        text=models.TextField(verbose_name=_("Description")),
    )
    department = models.ForeignKey(
        "Department", on_delete=models.CASCADE, related_name="history",
        verbose_name=_("Department")
    )
    order = models.PositiveIntegerField(default=0, verbose_name=_("Order"))

    class Meta:
        verbose_name = _("Department History Entry")
        verbose_name_plural = _("Department History")
        db_table = "DepartmentHistory"
        ordering = ["order"]

    def __str__(self):
        year = self.safe_translation_getter("year", any_language=True) or "?"
        return f"{self.department_id} – {year}"


class Department(TranslatableModel):
    """
    Represents a department. Contains translatable name, description, and address fields,
    and is associated with educational programs and department heads.
    """

    translated_fields = TranslatedFields(
        name = models.CharField(max_length=255, verbose_name=_("Department name")),
        description = models.TextField(verbose_name=_("Department description")),
        address = models.CharField(max_length=255, verbose_name=_("Department address")),
    )

    email = models.EmailField(verbose_name=_("Email address"))
    image = models.ImageField(upload_to="departments/", blank=True, verbose_name=_("Department photo"))
    room = models.CharField(max_length=64, blank=True, verbose_name=_("Room"))

    class Meta:
        verbose_name = _("Department")
        verbose_name_plural = _("Departments")
        db_table = "Department"

    def __str__(self):
        return f"{self.pk}-{self.name}"


class HeadOfDepartment(models.Model):
    """Represents a head of department, linked to a department."""

    department = models.ForeignKey(
        Department, on_delete=models.CASCADE,
        verbose_name=_("Department"), related_name="head_of_department"
    )
    full_name_uk = models.CharField(max_length=255, default='', verbose_name=_("Full name (UK)"))
    full_name_en = models.CharField(max_length=255, blank=True, default='', verbose_name=_("Full name (EN)"))
    regalia_uk = models.CharField(max_length=255, default='', verbose_name=_("Regalia (UK)"))
    regalia_en = models.CharField(max_length=255, blank=True, default='', verbose_name=_("Regalia (EN)"))
    email = models.EmailField(blank=True, null=True, verbose_name=_("Email"))
    audience = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Audience"))
    image = models.ImageField(upload_to="head_of_department/", blank=True, verbose_name=_("Photo"))

    class Meta:
        verbose_name = _("Head of Department")
        verbose_name_plural = _("Heads of Department")
        db_table = "HeadOfDepartment"

    def __str__(self):
        return self.full_name_uk or f"HeadOfDepartment #{self.pk}"

class EducationalProgram(TranslatableModel):
    """
    Represents an educational program. Contains translatable name and description fields,
    JSON fields for various academic levels (bachelor, magistracy, postgraduate),
    and is associated with a department and multiple categorized tags
    such as subjects, education forms, and education levels.
    """
    translated_fields = TranslatedFields(
        name = models.CharField(max_length=255, verbose_name=_("Educational program name")),
        description = models.TextField(verbose_name=_("Educational program description")),
        degree = models.CharField(max_length=64, blank=True, verbose_name=_("Degree")),
        form = models.CharField(max_length=128, blank=True, verbose_name=_("Study form")),
        bachelor=models.JSONField(
            verbose_name=_("Bachelor program structure"),
            blank=True,
            null=True,
            help_text=_(
                "Structure like: {'code': 'F1', 'specialty': '...', 'program': '...'}")
        ),
        magistracy = models.JSONField(
            verbose_name=_("Magistracy program structure"),
            blank=True,
            null=True,
            help_text=_(
                "Structure like: {'code': 'F1', 'specialty': '...', 'program': '...'}")
        ),
        postgraduate = models.JSONField(
            verbose_name=_("Postgraduate program structure"),
            blank=True,
            null=True,
            help_text=_("Structure like: {'code': 'F1', 'specialty': '...', 'program': '...'}")
        ),

    )
    department = models.ForeignKey(Department, on_delete=models.CASCADE, verbose_name=_("Department"), related_name="educational_program")
    code = models.CharField(max_length=255, verbose_name=_("Program code"))
    subject = TaggableManager(
        verbose_name=_("Subjects"),
        through=SubjectTaggedItem,
        blank=True,
        related_name="edu_program_subject"
    )
    education_forms = TaggableManager(
        verbose_name=_("Education Forms"),
        through=FormTaggedItem,
        blank=True,
        related_name="edu_program_forms"
    )
    education_levels = TaggableManager(
        verbose_name=_("Education Levels"),
        through=LevelTaggedItem,
        blank=True,
        related_name="edu_program_levels"
    )

    duration = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name=_("Duration (years)"))
    total_credits = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name=_("Total ECTS credits"))
    budget_seats = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name=_("Budget seats"))
    contract_seats = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name=_("Contract seats"))

    class Meta:
        verbose_name = _("Educational program")
        verbose_name_plural = _("Educational programs")
        db_table = "EducationalProgram"

    def __str__(self):
        return f"{self.code} – {self.safe_translation_getter('name', any_language=True)}"


class ProgramSubject(TranslatableModel):
    """Represents a subject within an educational program's curriculum."""

    class SubjectType(models.TextChoices):
        MANDATORY = "MN", _("Mandatory")
        ELECTIVE = "EL", _("Elective")

    translations = TranslatedFields(
        name=models.CharField(max_length=255, verbose_name=_("Subject name")),
    )
    program = models.ForeignKey(
        EducationalProgram, on_delete=models.CASCADE, related_name="subjects",
        verbose_name=_("Educational program")
    )
    semester = models.PositiveSmallIntegerField(verbose_name=_("Semester"))
    credits = models.DecimalField(max_digits=4, decimal_places=1, verbose_name=_("ECTS credits"))
    type = models.CharField(
        max_length=2, choices=SubjectType.choices, default=SubjectType.MANDATORY,
        verbose_name=_("Subject type")
    )
    order = models.PositiveIntegerField(default=0, verbose_name=_("Order"))

    class Meta:
        verbose_name = _("Program Subject")
        verbose_name_plural = _("Program Subjects")
        db_table = "ProgramSubject"
        ordering = ["semester", "order"]

    def __str__(self):
        name = self.safe_translation_getter("name", any_language=True) or "?"
        return f"Sem {self.semester} – {name}"