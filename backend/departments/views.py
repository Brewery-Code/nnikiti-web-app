from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Department, EducationalProgram
from .serializers import DepartmentListSerializer, DepartmentDetailSerializer, EducationalProgramSerializer


class DepartmentListView(ListAPIView):
    """
    Some text
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentListSerializer


class DepartmentDetailView(RetrieveAPIView):
    """
    Some text
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentDetailSerializer


class EducationalProgramListView(ListAPIView):
    """
    Some text
    """
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramSerializer