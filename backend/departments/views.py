from rest_framework import generics

from .models.departments import EducationalProgram
from .serializers import EducationalProgramSerializer


class EducationalProgramListAPIView(generics.ListAPIView):
    """ListAPIView for EducationalProgram."""
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramSerializer
