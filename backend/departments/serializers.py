from rest_framework import serializers

from .models.departments import EducationalProgram, Department, HeadOfDepartment
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


##### Department Detail ######
class HeadOfDepartmentSerializer(serializers.ModelSerializer):
    """Serializer for HeadOfDepartment."""
    regalia = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = HeadOfDepartment
        fields = ['id', 'regalia', 'full_name', 'email', 'audience']

    def get_regalia(self, obj):
        return obj.safe_translation_getter('regalia', any_language=True)

    def get_full_name(self, obj):
        return obj.safe_translation_getter('full_name', any_language=True)


class DepartmentEducationalProgramSerializer(serializers.ModelSerializer):
    """Serializer for DepartmentEducationalProgram."""
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    subject = CategorizedTagSerializer(many=True, read_only=True)
    education_forms = CategorizedTagSerializer(many=True, read_only=True)
    education_levels = CategorizedTagSerializer(many=True, read_only=True)

    class Meta:
        model = EducationalProgram
        fields = [
            'id', 'code', 'name', 'description',
            'bachelor', 'magistracy', 'postgraduate',
            'subject', 'education_forms', 'education_levels'
        ]

    def get_name(self, obj):
        return obj.safe_translation_getter('name', any_language=True)

    def get_description(self, obj):
        return obj.safe_translation_getter('description', any_language=True)


class DepartmentDetailSerializer(serializers.ModelSerializer):
    """Serializer for DepartmentDetail."""
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    head_of_department = HeadOfDepartmentSerializer(many=True, read_only=True)
    educational_program = EducationalProgramSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = [
            'id', 'name', 'description', 'address', 'email',
            'head_of_department',
            'educational_program'
        ]

    def get_name(self, obj):
        return obj.safe_translation_getter('name', any_language=True)

    def get_description(self, obj):
        return obj.safe_translation_getter('description', any_language=True)

    def get_address(self, obj):
        return obj.safe_translation_getter('address', any_language=True)