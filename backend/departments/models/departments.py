from django.db import models
from django.utils.translation import gettext_lazy as _
from mdeditor.fields import MDTextField
from parler.models import TranslatableModel, TranslatedFields

from core.utils import make_upload_to


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
    image = models.ImageField(upload_to=make_upload_to("faculty"), blank=True, verbose_name=_("Photo"))
    email = models.EmailField(blank=True, verbose_name=_("Email"))
    url = models.URLField(blank=True, verbose_name=_("Wiki URL"))

    class Meta:
        verbose_name = _("Faculty Member")
        verbose_name_plural = _("Faculty Members")
        db_table = "FacultyMember"

    def __str__(self):
        return self.name_uk or f"FacultyMember #{self.pk}"


class DepartmentHistory(models.Model):
    """Represents a historical event in the department's timeline."""

    department = models.ForeignKey(
        "Department", on_delete=models.CASCADE, related_name="history",
        verbose_name=_("Department")
    )
    year = models.CharField(max_length=64, default='', verbose_name=_("Year"))
    text_uk = models.TextField(default='', verbose_name=_("Description (UK)"))
    text_en = models.TextField(blank=True, default='', verbose_name=_("Description (EN)"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Order"))

    class Meta:
        verbose_name = _("Department History Entry")
        verbose_name_plural = _("Department History")
        db_table = "DepartmentHistory"
        ordering = ["order"]

    def __str__(self):
        return f"{self.year or '?'}"


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
    image = models.ImageField(upload_to=make_upload_to("departments"), blank=True, verbose_name=_("Department photo"))
    history_image = models.ImageField(upload_to=make_upload_to("departments/history"), blank=True, verbose_name=_("History photo"))
    room = models.CharField(max_length=64, blank=True, verbose_name=_("Room"))

    class Meta:
        verbose_name = _("Department")
        verbose_name_plural = _("Departments")
        db_table = "Department"

    def __str__(self):
        return self.safe_translation_getter('name', any_language=True) or f"Department #{self.pk}"


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
    image = models.ImageField(upload_to=make_upload_to("head_of_department"), blank=True, verbose_name=_("Photo"))
    url = models.URLField(blank=True, verbose_name=_("Wiki URL"))

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
        name = models.CharField(max_length=255, verbose_name=_("Specialty name")),
        name_op = models.CharField(max_length=255, blank=True, default='', verbose_name=_("Educational program name")),
        description = MDTextField(blank=True, default='', verbose_name=_("Educational program description")),
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
    url = models.URLField(blank=True, verbose_name=_("Program URL"))
    duration = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name=_("Duration (years)"))
    total_credits = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name=_("Total ECTS credits"))
    budget_seats = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name=_("Budget seats"))
    contract_seats = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name=_("Contract seats"))

    class Meta:
        verbose_name = _("Educational program")
        verbose_name_plural = _("Educational programs")
        db_table = "EducationalProgram"

    def __str__(self):
        if not self.pk:
            return self.code or "EducationalProgram (unsaved)"
        return f"{self.code} – {self.safe_translation_getter('name', any_language=True)}"


class ProgramSubject(TranslatableModel):
    """Represents a subject within an educational program's curriculum."""

    class SubjectType(models.TextChoices):
        MANDATORY = "MN", _("Mandatory")
        ELECTIVE = "EL", _("Elective")

    class ControlForm(models.TextChoices):
        EXAM = "exam", _("Exam")
        CREDIT = "credit", _("Credit")
        DIFF_CREDIT = "diff_credit", _("Differentiated credit")
        COURSEWORK = "coursework", _("Coursework")
        PRACTICE = "practice", _("Practice")
        THESIS = "thesis", _("Thesis / Qualification work")

    translations = TranslatedFields(
        name=models.CharField(max_length=255, verbose_name=_("Subject name")),
    )
    program = models.ForeignKey(
        EducationalProgram, on_delete=models.CASCADE, related_name="subjects",
        verbose_name=_("Educational program")
    )
    semester = models.PositiveSmallIntegerField(default=0, verbose_name=_("Semester"))
    credits = models.DecimalField(max_digits=4, decimal_places=1, verbose_name=_("ECTS credits"))
    type = models.CharField(
        max_length=2, choices=SubjectType.choices, default=SubjectType.MANDATORY,
        verbose_name=_("Subject type")
    )
    control_form = models.CharField(
        max_length=20, choices=ControlForm.choices, blank=True, default="",
        verbose_name=_("Control form")
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


class InstituteLeadership(models.Model):
    """Represents the institute leadership group (contains a shared photo and members)."""

    image = models.ImageField(upload_to=make_upload_to("institute_leadership"), blank=True, verbose_name=_("Group photo"))

    class Meta:
        verbose_name = _("Institute Leadership")
        verbose_name_plural = _("Institute Leaderships")
        db_table = "InstituteLeadership"

    def __str__(self):
        return f"InstituteLeadership #{self.pk}"


class InstituteLeaderMember(TranslatableModel):
    """Represents a single member of the institute leadership."""

    translated_fields = TranslatedFields(
        position=models.CharField(max_length=255, verbose_name=_("Position")),
    )
    leadership = models.ForeignKey(
        InstituteLeadership, on_delete=models.CASCADE,
        related_name="members", verbose_name=_("Leadership group")
    )
    full_name_uk = models.CharField(max_length=255, default='', verbose_name=_("Full name (UK)"))
    full_name_en = models.CharField(max_length=255, blank=True, default='', verbose_name=_("Full name (EN)"))
    email = models.EmailField(blank=True, verbose_name=_("Email"))
    image = models.ImageField(upload_to=make_upload_to("institute_leaders"), blank=True, verbose_name=_("Photo"))
    url = models.URLField(blank=True, verbose_name=_("Wiki URL"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Order"))

    class Meta:
        verbose_name = _("Institute Leader Member")
        verbose_name_plural = _("Institute Leader Members")
        db_table = "InstituteLeaderMember"
        ordering = ["order"]

    def __str__(self):
        return self.full_name_uk or f"InstituteLeaderMember #{self.pk}"