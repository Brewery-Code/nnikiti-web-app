from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .models.departments import EducationalProgram, Department, FacultyMember, HeadOfDepartment
from .serializers import (
    EducationalProgramSerializer, DepartmentListSerializer, DepartmentDetailSerializer,
    StaffFacultyMemberSerializer, StaffHeadSerializer,
)


@extend_schema(tags=['Departments'])
class EducationalProgramListView(generics.ListAPIView):
    """ListAPIView for EducationalProgram."""
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramSerializer


@extend_schema(tags=['Departments'])
class DepartmentListView(generics.ListAPIView):
    """ListAPIView for Department."""
    queryset = Department.objects.all()
    serializer_class = DepartmentListSerializer


@extend_schema(tags=['Departments'])
class DepartmentDetailView(generics.RetrieveAPIView):
    """RetrieveAPIView for Department."""
    queryset = Department.objects.all()
    serializer_class = DepartmentDetailSerializer
    lookup_field = 'pk'


@extend_schema(
    tags=['Departments'],
    summary='Весь персонал',
    description='Повертає об\'єднаний список усіх викладачів та завідувачів кафедр. '
                'Поле `type` = "faculty" або "head".',
    parameters=[
        OpenApiParameter(
            name='department',
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            required=False,
            description='Фільтр за ID кафедри',
        ),
    ],
)
class StaffListView(APIView):
    """Returns all faculty members and heads of department combined."""

    def get(self, request):
        department_id = request.query_params.get('department')

        faculty_qs = FacultyMember.objects.select_related('department').all()
        head_qs = HeadOfDepartment.objects.select_related('department').all()

        if department_id:
            faculty_qs = faculty_qs.filter(department_id=department_id)
            head_qs = head_qs.filter(department_id=department_id)

        ctx = {'request': request}
        faculty_data = StaffFacultyMemberSerializer(faculty_qs, many=True, context=ctx).data
        head_data = StaffHeadSerializer(head_qs, many=True, context=ctx).data

        return Response(list(head_data) + list(faculty_data))