from django.db import models
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields
from django.db import models
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields
from taggit.managers import TaggableManager
from taggit.models import TagBase, GenericTaggedItemBase
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType

#########################
# Tagged models
#########################
class CategorizedTag(TranslatableModel):
    """
    Represents a categorized tag. Contains a translatable name
    and a tag category such as subject, education form, or education level.
    """
    CATEGORY_CHOICES = [
        ('subject', _('Subject')),
        ('education_form', _('Form')),
        ('education_level', _('Education Level')),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    translations = TranslatedFields(
        name=models.CharField(max_length=100)
    )

    class Meta:
        verbose_name = _('Tag')
        verbose_name_plural = _('Tags')
        db_table = 'categorized_tag'

    def __str__(self):
        return self.safe_translation_getter("name", any_language=True)

class SubjectTaggedItem(GenericTaggedItemBase):
    """
    Represents a subject tag assignment. Links a categorized subject tag
    to a specific EducationalProgram instance.
    """
    educational_program = models.ForeignKey('EducationalProgram', on_delete=models.CASCADE, related_name='subject_items')
    tag = models.ForeignKey(CategorizedTag, on_delete=models.CASCADE, related_name="subject_items")

    class Meta:
        verbose_name = _('Subject Tag')
        verbose_name_plural = _('Subject Tags')
        unique_together = ('educational_program', 'tag')

class FormTaggedItem(GenericTaggedItemBase):
    """
    Represents an education form tag assignment. Links a categorized form tag
    to a specific EducationalProgram instance.
    """
    educational_program = models.ForeignKey('EducationalProgram', on_delete=models.CASCADE, related_name='form_items')
    tag = models.ForeignKey(CategorizedTag, on_delete=models.CASCADE, related_name="form_items")

    class Meta:
        verbose_name = _('Form Tag')
        verbose_name_plural = _('Form Tags')
        db_table = 'form_tag'
        unique_together = ('educational_program', 'tag')

class LevelTaggedItem(GenericTaggedItemBase):
    """
    Represents an education level tag assignment. Links a categorized level tag
    to a specific EducationalProgram instance.
    """
    educational_program = models.ForeignKey('EducationalProgram', on_delete=models.CASCADE, related_name='level_items')
    tag = models.ForeignKey(CategorizedTag, on_delete=models.CASCADE, related_name="level_items")

    class Meta:
        verbose_name = _('Level Tag')
        verbose_name_plural = _('Level Tags')
        db_table = 'level_tag'
        unique_together = ('educational_program', 'tag')

#########################
# Main models
#########################
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

    class Meta:
        verbose_name = _("Department")
        verbose_name_plural = _("Departments")
        db_table = "Department"

    def __str__(self):
        return f"{self.pk}-{self.name}"


class HeadOfDepartment(TranslatableModel):
    """
    Represents a head of department. Contains translatable regalia and full name fields,
    and is linked to a department.
    """
    translated_fields = TranslatedFields(
        regalia = models.CharField(max_length=255, verbose_name=_("Regalia"), help_text=_("Regalias head of the department")),
        full_name = models.CharField(max_length=255, verbose_name=_("Full name"), help_text=_("Full name of the head")),
    )
    department = models.ForeignKey(Department, on_delete=models.CASCADE, verbose_name=_("Department"), related_name="head_of_department")
    email = models.EmailField(verbose_name=_("Head of the department email"), blank=True, null=True)
    audience = models.CharField(max_length=255, verbose_name=_("Audience"), blank=True, null=True)

    class Meta:
        verbose_name = _("Head of Department")
        verbose_name_plural = _("Head of Departments")
        db_table = "HeadOfDepartment"

    def __str__(self):
        return f"{self.pk}-{self.department.name}"

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

    class Meta:
        verbose_name = _("Educational program")
        verbose_name_plural = _("Educational programs")
        db_table = "EducationalProgram"

    def __str__(self):
        return f"{self.code} – {self.safe_translation_getter('name', any_language=True)}"