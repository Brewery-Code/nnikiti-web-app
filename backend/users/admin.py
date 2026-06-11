from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserCreationForm, ReadOnlyPasswordHashField
from django.contrib import admin
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django import forms
from unfold.admin import ModelAdmin
from unfold.forms import AdminPasswordChangeForm

from .models import User


OPERATOR_MODELS = [
    ("departments", "department"),
    ("departments", "headofdepartment"),
    ("departments", "educationalprogram"),
    ("departments", "facultymember"),
    ("departments", "departmenthistory"),
    ("departments", "programsubject"),
    ("departments", "categorizedtag"),
]


def _get_operator_permissions():
    perms = []
    for app_label, model in OPERATOR_MODELS:
        try:
            ct = ContentType.objects.get(app_label=app_label, model=model)
            perms.extend(Permission.objects.filter(content_type=ct))
        except ContentType.DoesNotExist:
            pass
    return perms


def _apply_role_permissions(user):
    role = user.role
    if role in (User.Role.STUDENT, User.Role.TEACHER):
        user.is_staff = False
        user.is_superuser = False
        user.user_permissions.clear()
    elif role == User.Role.DATA_OPERATOR:
        user.is_staff = True
        user.is_superuser = False
        user.user_permissions.set(_get_operator_permissions())
    elif role == User.Role.ADMIN:
        user.is_staff = True
        user.is_superuser = True
        user.user_permissions.clear()
    user.save(update_fields=["is_staff", "is_superuser"])


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(
        label="Пароль",
        help_text=(
            'Паролі зберігаються у зашифрованому вигляді. '
            '<a href="../password/" style="color:#7c3aed;text-decoration:underline;font-weight:600;">Змінити пароль →</a>'
        ),
    )

    class Meta:
        model = User
        fields = ("email", "first_name", "last_name", "password", "role", "is_active")


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("email", "first_name", "last_name")


@admin.register(User)
class UserAdmin(ModelAdmin, BaseUserAdmin):
    form = UserChangeForm
    add_form = CustomUserCreationForm
    change_password_form = AdminPasswordChangeForm

    list_display = ["id", "get_full_name", "email", "role", "department", "is_staff", "is_active"]
    list_display_links = ["id", "get_full_name", "email"]
    list_filter = ["role", "department"]
    search_fields = ["email", "first_name", "last_name"]
    ordering = ["email"]

    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Персональна інформація", {"fields": ["first_name", "last_name"]}),
        ("Роль та кафедра", {"fields": ["role", "department", "is_active"]}),
    ]
    add_fieldsets = [
        (None, {"fields": ["email", "first_name", "last_name", "password1", "password2"]}),
        ("Роль та кафедра", {"fields": ["role", "department"]}),
    ]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        _apply_role_permissions(obj)
