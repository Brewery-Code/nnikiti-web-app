from rest_framework import serializers

from .models import *

# --- departments/ ---
class DepartmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("id", "name")


# --- departments/{pk}/ ---
class DepartmentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentImage
        fields = ("id", "image")


class DepartmentSocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentSocialLink
        fields = ("id", "name", "url")


class HeadOfDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeadOfDepartment
        fields = ("id", "full_name", "regalia", "email", "audience")


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ("id", "name")


class EducationalProgramLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalProgramLevel
        fields = ("id", "name")


class StudyFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyForm
        fields = ("id", "name")

class EducationalProgramSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, source="subject")
    levels = EducationalProgramLevelSerializer(many=True)
    study_forms = StudyFormSerializer(many=True, source="study_form")

    class Meta:
        model = EducationalProgram
        fields = ("id", "name", "description", "code", "subjects", "levels", "study_forms")

class DepartmentDetailSerializer(serializers.ModelSerializer):
    images = DepartmentImageSerializer(many=True)
    social_links = DepartmentSocialLinkSerializer(many=True)
    heads = HeadOfDepartmentSerializer(many=True)
    programs = EducationalProgramSerializer(many=True)

    class Meta:
        model = Department
        fields = (
            "id", "name", "description", "address",
            "email_of_department", "date_of_establishment",
            "department_website",
            "images", "social_links", "heads", "programs"
        )
