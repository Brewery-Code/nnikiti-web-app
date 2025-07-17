from rest_framework import serializers
from .models import EducationalProgram, CategorizedTag

class CategorizedTagSerializer(serializers.ModelSerializer):
    """Serializer for CategorizedTag."""
    name = serializers.SerializerMethodField()

    class Meta:
        model = CategorizedTag
        fields = ['id', 'name', 'category']

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
            'description',
            'bachelor',
            'magistracy',
            'postgraduate',
            'department',
            'subject',
            'education_forms',
            'education_levels',
        ]
