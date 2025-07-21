from django.contrib import admin
from parler.admin import TranslatableAdmin
from django import forms
from django.forms.models import BaseInlineFormSet

from .models.departments import Department, HeadOfDepartment, EducationalProgram
from .models.tagged import CategorizedTag, SubjectTaggedItem, FormTaggedItem, LevelTaggedItem


#########################
# Forms
#########################
class SubjectTaggedItemForm(forms.ModelForm):
    """
    ModelForm for SubjectTaggedItem.
    Removes 'content_type' and 'object_id' fields which are handled automatically by the formset.
    """
    class Meta:
        model = SubjectTaggedItem
        exclude = ('content_type', 'object_id')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('content_type', None)
        self.fields.pop('object_id', None)

class FormTaggedItemForm(forms.ModelForm):
    """
    ModelForm for FormTaggedItem.
    Hides 'content_type' and 'object_id' since they are auto-managed.
    """
    class Meta:
        model = FormTaggedItem
        exclude = ('content_type', 'object_id')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('content_type', None)
        self.fields.pop('object_id', None)

class LevelTaggedItemForm(forms.ModelForm):
    """
    ModelForm for LevelTaggedItem.
    Excludes 'content_type' and 'object_id' which are set in the inline formset.
    """
    class Meta:
        model = LevelTaggedItem
        exclude = ('content_type', 'object_id')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('content_type', None)
        self.fields.pop('object_id', None)

class GenericTagInlineFormSet(BaseInlineFormSet):
    """
    Custom inline formset for generic tag relations.
    Automatically sets 'content_object' (GenericForeignKey) to the parent instance.
    """
    def save_new(self, form, commit=True):
        obj = super().save_new(form, commit=False)

        obj.content_object = self.instance

        if commit:
            obj.save()
            form.save_m2m()

        return obj

#########################
# Inlines
#########################
class SubjectTaggedItemInline(admin.TabularInline):
    """Inline editing for tagged items related to a subject."""
    model = SubjectTaggedItem
    form = SubjectTaggedItemForm
    formset = GenericTagInlineFormSet
    extra = 1

class FormTaggedItemInline(admin.TabularInline):
    """Inline editing for tagged items related to a form."""
    model = FormTaggedItem
    form = FormTaggedItemForm
    formset = GenericTagInlineFormSet
    extra = 1

class LevelTaggedItemInline(admin.TabularInline):
    """Inline editing for tagged items related to a level."""
    model = LevelTaggedItem
    form = LevelTaggedItemForm
    formset = GenericTagInlineFormSet
    extra = 1

#########################
# Admin
#########################
@admin.register(Department)
class DepartmentAdmin(TranslatableAdmin):
    """Custom admin for departments."""
    list_display = ('id', 'name', 'email')
    search_fields = ('translations__name', 'email')


@admin.register(HeadOfDepartment)
class HeadOfDepartmentAdmin(TranslatableAdmin):
    """Custom admin for heads of departments."""
    list_display = ('id', 'full_name', 'department', 'email', 'audience')
    search_fields = ('translations__full_name', 'email', 'department__translations__name')
    list_filter = ('department',)


@admin.register(EducationalProgram)
class EducationalProgramAdmin(TranslatableAdmin):
    """Custom admin for educational programs."""
    list_display = ('id', 'code', 'name', 'department')
    search_fields = ('code', 'translations__name', 'department__translations__name')
    list_filter = ('department',)
    inlines = [
        SubjectTaggedItemInline,
        FormTaggedItemInline,
        LevelTaggedItemInline,
    ]
    exclude = ('subject', 'education_forms', 'education_levels')

@admin.register(CategorizedTag)
class CategorizedTagAdmin(TranslatableAdmin):
    """Custom admin for categorized tags."""
    list_display = ("name", "category")
    list_filter = ("category",)
    search_fields = ("translations__name",)