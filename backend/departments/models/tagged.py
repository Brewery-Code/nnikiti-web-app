from django.db import models
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields
from taggit.models import GenericTaggedItemBase


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
