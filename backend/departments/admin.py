from django.contrib import admin
from parler.admin import TranslatableAdmin
from django import forms
from mdeditor.widgets import MDEditorWidget
from unfold.admin import ModelAdmin, TabularInline

from .models.departments import (
    Department, HeadOfDepartment, EducationalProgram,
    FacultyMember, DepartmentHistory, ProgramSubject,
    InstituteLeadership, InstituteLeaderMember,
)


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
# Inlines
#########################
class DepartmentHistoryInline(TabularInline):
    """Inline editing for department history entries."""
    model = DepartmentHistory
    extra = 0
    verbose_name = "Запис історії"
    verbose_name_plural = "Історія кафедри"
    fields = ('year', 'text_uk', 'text_en', 'order')

class ProgramSubjectInlineForm(forms.ModelForm):
    name_uk = forms.CharField(label="Назва (УК)", required=False)
    name_en = forms.CharField(label="Назва (EN)", required=False)

    class Meta:
        model = ProgramSubject
        fields = ('credits', 'type', 'control_form')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields['name_uk'].initial = self.instance.safe_translation_getter('name', language_code='uk')
            self.fields['name_en'].initial = self.instance.safe_translation_getter('name', language_code='en')

    def save(self, commit=True):
        instance = super().save(commit=False)
        name_uk = self.cleaned_data.get('name_uk', '')
        name_en = self.cleaned_data.get('name_en', '')
        if name_uk:
            instance.set_current_language('uk')
            instance.name = name_uk
        if name_en:
            instance.set_current_language('en')
            instance.name = name_en
        if commit:
            instance.save()
            self.save_m2m()
        return instance


class ProgramSubjectInline(TabularInline):
    """Inline editing for program subjects."""
    model = ProgramSubject
    form = ProgramSubjectInlineForm
    extra = 0
    verbose_name = "Дисципліна"
    verbose_name_plural = "Навчальний план (дисципліни)"
    fields = ('name_uk', 'name_en', 'credits', 'type', 'control_form')
    show_change_link = True

class FacultyMemberInline(TabularInline):
    """Inline editing for faculty members."""
    model = FacultyMember
    extra = 0
    verbose_name = "Викладач"
    verbose_name_plural = "Колектив кафедри"
    fields = ('name_uk', 'name_en', 'role_uk', 'role_en', 'email', 'url', 'image')

class HeadOfDepartmentInline(TabularInline):
    """Inline editing for head of department."""
    model = HeadOfDepartment
    extra = 0
    verbose_name = "Завідувач кафедри"
    verbose_name_plural = "Завідувач кафедри"
    fields = ('full_name_uk', 'full_name_en', 'regalia_uk', 'regalia_en', 'email', 'url', 'image')

class EducationalProgramInlineForm(forms.ModelForm):
    name_uk = forms.CharField(label="Спеціальність (УК)", required=False)
    name_en = forms.CharField(label="Спеціальність (EN)", required=False)
    name_op_uk = forms.CharField(label="Назва ОП (УК)", required=False)
    name_op_en = forms.CharField(label="Назва ОП (EN)", required=False)

    class Meta:
        model = EducationalProgram
        fields = ('code', 'url', 'duration', 'total_credits')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields['name_uk'].initial = self.instance.safe_translation_getter('name', language_code='uk')
            self.fields['name_en'].initial = self.instance.safe_translation_getter('name', language_code='en')
            self.fields['name_op_uk'].initial = self.instance.safe_translation_getter('name_op', language_code='uk')
            self.fields['name_op_en'].initial = self.instance.safe_translation_getter('name_op', language_code='en')

    def save(self, commit=True):
        instance = super().save(commit=False)
        for lang, suffix in (('uk', '_uk'), ('en', '_en')):
            name = self.cleaned_data.get(f'name{suffix}', '')
            name_op = self.cleaned_data.get(f'name_op{suffix}', '')
            if name or name_op:
                instance.set_current_language(lang)
                if name:
                    instance.name = name
                if name_op:
                    instance.name_op = name_op
        if commit:
            instance.save()
            self.save_m2m()
        return instance


class EducationalProgramInline(TabularInline):
    """Inline editing for educational programs."""
    model = EducationalProgram
    form = EducationalProgramInlineForm
    extra = 0
    verbose_name = "Освітня програма"
    verbose_name_plural = "Освітні програми"
    fields = ('name_uk', 'name_en', 'name_op_uk', 'name_op_en', 'code', 'url', 'duration', 'total_credits')
    show_change_link = True

#########################
# Admin
#########################
@admin.register(Department)
class DepartmentAdmin(DepartmentScopedMixin, UnfoldTranslatableAdmin):
    """Custom admin for departments."""
    list_display = ('id', 'name', 'email', 'room')
    list_display_links = ('id', 'name')
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
    list_display = ('id', 'full_name_uk', 'department', 'email')
    list_display_links = ('id', 'full_name_uk')
    search_fields = ('full_name_uk', 'full_name_en', 'email')
    list_filter = ('department',)


@admin.register(EducationalProgram)
class EducationalProgramAdmin(DepartmentScopedMixin, UnfoldTranslatableAdmin):
    """Custom admin for educational programs."""
    list_display = ('id', 'code', 'name', 'department')
    list_display_links = ('id', 'code', 'name')
    search_fields = ('code', 'translations__name', 'department__translations__name')
    list_filter = ('department',)
    exclude = ('bachelor', 'magistracy', 'postgraduate', 'budget_seats', 'contract_seats')
    inlines = [ProgramSubjectInline]

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if 'description' in form.base_fields:
            form.base_fields['description'].widget = MDEditorWidget()
        return form

@admin.register(FacultyMember)
class FacultyMemberAdmin(DepartmentScopedMixin, ModelAdmin):
    """Custom admin for faculty members."""
    list_display = ("id", "name_uk", "role_uk", "department", "email")
    list_display_links = ("id", "name_uk")
    list_filter = ("department",)
    search_fields = ("name_uk", "name_en", "email")
    ordering = ("department",)


@admin.register(DepartmentHistory)
class DepartmentHistoryAdmin(DepartmentScopedMixin, ModelAdmin):
    """Custom admin for department history entries."""
    list_display = ("id", "year", "department", "order")
    list_display_links = ("id", "year")
    list_filter = ("department",)
    search_fields = ("year", "text_uk")
    ordering = ("department", "order")


@admin.register(ProgramSubject)
class ProgramSubjectAdmin(UnfoldTranslatableAdmin):
    """Custom admin for program subjects."""
    list_display = ("id", "name", "program", "semester", "credits", "type", "order")
    list_display_links = ("id", "name")
    list_filter = ("program", "semester", "type", "control_form")
    search_fields = ("translations__name",)
    ordering = ("program", "semester", "order")


class InstituteLeaderMemberInlineForm(forms.ModelForm):
    position_uk = forms.CharField(label="Посада (УК)", required=False)
    position_en = forms.CharField(label="Посада (EN)", required=False)

    class Meta:
        model = InstituteLeaderMember
        fields = ('full_name_uk', 'full_name_en', 'email', 'url', 'image', 'order')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields['position_uk'].initial = self.instance.safe_translation_getter('position', language_code='uk')
            self.fields['position_en'].initial = self.instance.safe_translation_getter('position', language_code='en')

    def save(self, commit=True):
        instance = super().save(commit=False)
        for lang, suffix in (('uk', '_uk'), ('en', '_en')):
            position = self.cleaned_data.get(f'position{suffix}', '')
            if position:
                instance.set_current_language(lang)
                instance.position = position
        if commit:
            instance.save()
            self.save_m2m()
        return instance


class InstituteLeaderMemberInline(TabularInline):
    """Inline editing for institute leadership members."""
    model = InstituteLeaderMember
    form = InstituteLeaderMemberInlineForm
    extra = 0
    verbose_name = "Член керівництва"
    verbose_name_plural = "Склад керівництва"
    fields = ('full_name_uk', 'full_name_en', 'position_uk', 'position_en', 'email', 'url', 'image', 'order')


@admin.register(InstituteLeadership)
class InstituteLeadershipAdmin(ModelAdmin):
    """Custom admin for institute leadership."""
    list_display = ("id", "title_uk")
    list_display_links = ("id", "title_uk")
    inlines = [InstituteLeaderMemberInline]

