from rest_framework import generics

from .models.departments import EducationalProgram, Department
from .serializers import EducationalProgramSerializer, DepartmentListSerializer, DepartmentDetailSerializer


class EducationalProgramListView(generics.ListAPIView):
    """ListAPIView for EducationalProgram."""
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramSerializer


class DepartmentListView(generics.ListAPIView):
    """ListAPIView for Department."""
    queryset = Department.objects.all()
    serializer_class = DepartmentListSerializer


class DepartmentDetailView(generics.RetrieveAPIView):
    """RetrieveAPIView for Department."""
    queryset = Department.objects.all()
    serializer_class = DepartmentDetailSerializer
    lookup_field = 'pk'