from django.contrib import admin

from parler.admin import TranslatableAdmin, TranslatableStackedInline

from .models import *

# --- Inlines ---
class DepartmentImageInline(admin.TabularInline):
    model = DepartmentImage
    extra = 1

class DepartmentSocialLinkInline(admin.TabularInline):
    model = DepartmentSocialLink
    extra = 1


# --- Основна адмінка Department ---
@admin.register(Department)
class DepartmentAdmin(TranslatableAdmin):
    """
    Department admin
    """
    list_display = ("pk", "name")
    inlines = [
        DepartmentImageInline,
        DepartmentSocialLinkInline,
    ]


@admin.register(DepartmentImage)
class DepartmentImageAdmin(TranslatableAdmin):
    """
    Department image admin
    """
    list_display = ("pk",)


@admin.register(DepartmentSocialLink)
class DepartmentSocialLinkAdmin(TranslatableAdmin):
    """
    Department social link admin
    """
    list_display = ("pk", "name")


@admin.register(HeadOfDepartment)
class HeadOfDepartmentAdmin(TranslatableAdmin):
    """
    Head of department admin
    """
    list_display = ("pk", "full_name")


@admin.register(EducationalProgram)
class EducationalProgramAdmin(TranslatableAdmin):
    """
    Educational program admin
    """
    list_display = ("pk", "name")


@admin.register(EducationalProgramLevel)
class EducationalProgramLevelAdmin(TranslatableAdmin):
    """
    Educational program level admin
    """
    list_display = ("pk", "name")


@admin.register(StudyForm)
class StudyFormAdmin(TranslatableAdmin):
    """
    Study form admin
    """
    list_display = ("pk", "name")


@admin.register(Subject)
class SubjectAdmin(TranslatableAdmin):
    """
    Subject admin
    """
    list_display = ("pk", "name")
