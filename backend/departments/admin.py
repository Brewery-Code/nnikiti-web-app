from django.contrib import admin
from parler.admin import TranslatableAdmin
from django import forms
from django.forms.models import BaseInlineFormSet
from unfold.admin import ModelAdmin, TabularInline

from .models.departments import (
    Department, HeadOfDepartment, EducationalProgram,
    FacultyMember, DepartmentHistory, ProgramSubject,
)
from .models.tagged import CategorizedTag, SubjectTaggedItem, FormTaggedItem, LevelTaggedItem


class UnfoldTranslatableAdmin(ModelAdmin, TranslatableAdmin):
    change_form_template = "admin/parler/change_form.html"


class DepartmentScopedMixin:
    """Limits queryset to the department assigned to the current user."""

    department_field = "department"

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser or not request.user.department_id:
            return qs
        return qs.filter(**{self.department_field: request.user.department_id})

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if not request.user.is_superuser and request.user.department_id:
            if self.department_field.split("__")[0] in form.base_fields:
                field = form.base_fields[self.department_field.split("__")[0]]
                field.initial = request.user.department_id
                field.disabled = True
        return form


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
class SubjectTaggedItemInline(TabularInline):
    """Inline editing for tagged items related to a subject."""
    model = SubjectTaggedItem
    form = SubjectTaggedItemForm
    formset = GenericTagInlineFormSet
    extra = 1

class FormTaggedItemInline(TabularInline):
    """Inline editing for tagged items related to a form."""
    model = FormTaggedItem
    form = FormTaggedItemForm
    formset = GenericTagInlineFormSet
    extra = 1

class LevelTaggedItemInline(TabularInline):
    """Inline editing for tagged items related to a level."""
    model = LevelTaggedItem
    form = LevelTaggedItemForm
    formset = GenericTagInlineFormSet
    extra = 1

class DepartmentHistoryInline(TabularInline):
    """Inline editing for department history entries."""
    model = DepartmentHistory
    extra = 0
    verbose_name = "Запис історії"
    verbose_name_plural = "Історія кафедри"
    fields = ('year', 'text_uk', 'text_en', 'order')

class ProgramSubjectInline(TabularInline):
    """Inline editing for program subjects."""
    model = ProgramSubject
    extra = 0
    verbose_name = "Дисципліна"
    verbose_name_plural = "Навчальний план (дисципліни)"
    fields = ('semester', 'credits', 'type', 'control_form', 'order')
    show_change_link = True

class FacultyMemberInline(TabularInline):
    """Inline editing for faculty members."""
    model = FacultyMember
    extra = 0
    verbose_name = "Викладач"
    verbose_name_plural = "Колектив кафедри"
    fields = ('name_uk', 'name_en', 'role_uk', 'role_en', 'email', 'audience', 'image')

class HeadOfDepartmentInline(TabularInline):
    """Inline editing for head of department."""
    model = HeadOfDepartment
    extra = 0
    verbose_name = "Завідувач кафедри"
    verbose_name_plural = "Завідувач кафедри"
    fields = ('full_name_uk', 'full_name_en', 'regalia_uk', 'regalia_en', 'email', 'audience', 'image')

class EducationalProgramInline(TabularInline):
    """Inline editing for educational programs."""
    model = EducationalProgram
    extra = 0
    verbose_name = "Освітня програма"
    verbose_name_plural = "Освітні програми"
    fields = ('code', 'url', 'duration', 'total_credits', 'budget_seats', 'contract_seats')
    show_change_link = True

#########################
# Admin
#########################
@admin.register(Department)
class DepartmentAdmin(DepartmentScopedMixin, UnfoldTranslatableAdmin):
    """Custom admin for departments."""
    list_display = ('id', 'name', 'email', 'room')
    search_fields = ('translations__name', 'email')
    department_field = "pk"
    inlines = [
        HeadOfDepartmentInline,
        FacultyMemberInline,
        EducationalProgramInline,
        DepartmentHistoryInline,
    ]

    def get_queryset(self, request):
        qs = super(UnfoldTranslatableAdmin, self).get_queryset(request)
        if request.user.is_superuser or not request.user.department_id:
            return qs
        return qs.filter(pk=request.user.department_id)


@admin.register(HeadOfDepartment)
class HeadOfDepartmentAdmin(DepartmentScopedMixin, ModelAdmin):
    """Custom admin for heads of departments."""
    list_display = ('id', 'full_name_uk', 'department', 'email', 'audience')
    search_fields = ('full_name_uk', 'full_name_en', 'email')
    list_filter = ('department',)


@admin.register(EducationalProgram)
class EducationalProgramAdmin(DepartmentScopedMixin, UnfoldTranslatableAdmin):
    """Custom admin for educational programs."""
    list_display = ('id', 'code', 'name', 'department')
    search_fields = ('code', 'translations__name', 'department__translations__name')
    list_filter = ('department',)
    inlines = [
        SubjectTaggedItemInline,
        FormTaggedItemInline,
        LevelTaggedItemInline,
        ProgramSubjectInline,
    ]
    exclude = ('subject', 'education_forms', 'education_levels')

@admin.register(CategorizedTag)
class CategorizedTagAdmin(UnfoldTranslatableAdmin):
    """Custom admin for categorized tags."""
    list_display = ("name", "category")
    list_filter = ("category",)
    search_fields = ("translations__name",)


@admin.register(FacultyMember)
class FacultyMemberAdmin(DepartmentScopedMixin, ModelAdmin):
    """Custom admin for faculty members."""
    list_display = ("id", "name_uk", "role_uk", "department", "email", "audience")
    list_filter = ("department",)
    search_fields = ("name_uk", "name_en", "email")
    ordering = ("department",)


@admin.register(DepartmentHistory)
class DepartmentHistoryAdmin(DepartmentScopedMixin, ModelAdmin):
    """Custom admin for department history entries."""
    list_display = ("id", "year", "department", "order")
    list_filter = ("department",)
    search_fields = ("year", "text_uk")
    ordering = ("department", "order")


@admin.register(ProgramSubject)
class ProgramSubjectAdmin(UnfoldTranslatableAdmin):
    """Custom admin for program subjects."""
    list_display = ("id", "name", "program", "semester", "credits", "type", "order")
    list_filter = ("program", "semester", "type", "control_form")
    search_fields = ("translations__name",)
    ordering = ("program", "semester", "order")

