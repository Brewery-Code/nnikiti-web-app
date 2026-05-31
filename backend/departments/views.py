from rest_framework import generics
from drf_spectacular.utils import extend_schema

from .models.departments import EducationalProgram, Department
from .serializers import EducationalProgramSerializer, DepartmentListSerializer, DepartmentDetailSerializer


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