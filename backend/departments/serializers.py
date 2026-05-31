from rest_framework import serializers

from .models.departments import (
    EducationalProgram, Department, HeadOfDepartment,
    FacultyMember, DepartmentHistory, ProgramSubject,
)
from .models.tagged import CategorizedTag


class CategorizedTagSerializer(serializers.ModelSerializer):
    """Serializer for CategorizedTag."""
    name = serializers.SerializerMethodField()

    class Meta:
        model = CategorizedTag
        fields = ['id', 'name',]

    def get_name(self, obj):
        return obj.safe_translation_getter('name', any_language=True)


class EducationalProgramSerializer(serializers.ModelSerializer):
    """Serializer for EducationalProgram."""
    subject = CategorizedTagSerializer(many=True, read_only=True)
    education_forms = CategorizedTagSerializer(many=True, read_only=True)
    education_levels = CategorizedTagSerializer(many=True, read_only=True)

    class Meta:
        model = EducationalProgram
        fields = [
            'id',
            'code',
            'name',
            'subject',
            'education_forms',
            'education_levels',
        ]


class DepartmentListSerializer(serializers.ModelSerializer):
    """Serializer for DepartmentList."""
    class Meta:
        model = Department
        fields = ['id', 'name']


class FacultyMemberSerializer(serializers.ModelSerializer):
    """Serializer for FacultyMember."""
    name = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    specialty = serializers.SerializerMethodField()

    class Meta:
        model = FacultyMember
        fields = ["id", "name", "role", "specialty", "image", "email", "audience"]

    def _lang(self, obj, field):
        request = self.context.get('request')
        lang = request.LANGUAGE_CODE if request else 'uk'
        en_val = getattr(obj, f"{field}_en", '')
        return en_val if lang == 'en' and en_val else getattr(obj, f"{field}_uk", '')

    def get_name(self, obj):
        return self._lang(obj, 'name')

    def get_role(self, obj):
        return self._lang(obj, 'role')

    def get_specialty(self, obj):
        return self._lang(obj, 'specialty')


class DepartmentHistorySerializer(serializers.ModelSerializer):
    """Serializer for DepartmentHistory."""
    year = serializers.SerializerMethodField()
    text = serializers.SerializerMethodField()

    class Meta:
        model = DepartmentHistory
        fields = ["id", "year", "text"]

    def get_year(self, obj):
        return obj.safe_translation_getter("year", any_language=True)

    def get_text(self, obj):
        return obj.safe_translation_getter("text", any_language=True)


class ProgramSubjectSerializer(serializers.ModelSerializer):
    """Serializer for ProgramSubject."""
    name = serializers.SerializerMethodField()

    class Meta:
        model = ProgramSubject
        fields = ["id", "name", "semester", "credits", "type"]

    def get_name(self, obj):
        return obj.safe_translation_getter("name", any_language=True)


##### Department Detail ######
class HeadOfDepartmentSerializer(serializers.ModelSerializer):
    """Serializer for HeadOfDepartment."""
    full_name = serializers.SerializerMethodField()
    regalia = serializers.SerializerMethodField()

    class Meta:
        model = HeadOfDepartment
        fields = ['id', 'full_name', 'regalia', 'email', 'audience', 'image']

    def _lang(self, obj, field):
        request = self.context.get('request')
        lang = request.LANGUAGE_CODE if request else 'uk'
        en_val = getattr(obj, f"{field}_en", '')
        return en_val if lang == 'en' and en_val else getattr(obj, f"{field}_uk", '')

    def get_full_name(self, obj):
        return self._lang(obj, 'full_name')

    def get_regalia(self, obj):
        return self._lang(obj, 'regalia')


class DepartmentEducationalProgramSerializer(serializers.ModelSerializer):
    """Serializer for DepartmentEducationalProgram."""
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    degree = serializers.SerializerMethodField()
    form = serializers.SerializerMethodField()
    subject = CategorizedTagSerializer(many=True, read_only=True)
    education_forms = CategorizedTagSerializer(many=True, read_only=True)
    education_levels = CategorizedTagSerializer(many=True, read_only=True)
    subjects = ProgramSubjectSerializer(many=True, read_only=True)

    class Meta:
        model = EducationalProgram
        fields = [
            'id', 'code', 'name', 'description',
            'degree', 'form', 'duration', 'total_credits',
            'bachelor', 'magistracy', 'postgraduate',
            'subject', 'education_forms', 'education_levels',
            'subjects',
        ]

    def get_name(self, obj):
        return obj.safe_translation_getter('name', any_language=True)

    def get_description(self, obj):
        return obj.safe_translation_getter('description', any_language=True)

    def get_degree(self, obj):
        return obj.safe_translation_getter('degree', any_language=True)

    def get_form(self, obj):
        return obj.safe_translation_getter('form', any_language=True)


class DepartmentDetailSerializer(serializers.ModelSerializer):
    """Serializer for DepartmentDetail."""
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    head_of_department = HeadOfDepartmentSerializer(many=True, read_only=True)
    educational_program = DepartmentEducationalProgramSerializer(many=True, read_only=True)
    team = FacultyMemberSerializer(many=True, read_only=True)
    history = DepartmentHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = [
            'id', 'name', 'description', 'address', 'email',
            'head_of_department',
            'educational_program',
            'team',
            'history',
        ]

    def get_name(self, obj):
        return obj.safe_translation_getter('name', any_language=True)

    def get_description(self, obj):
        return obj.safe_translation_getter('description', any_language=True)

    def get_address(self, obj):
        return obj.safe_translation_getter('address', any_language=True)