from django.urls import path

from .views import *


urlpatterns = [
    path("", DepartmentListView.as_view()),
    path("<int:pk>/", DepartmentDetailView.as_view()),
    path("educational-programs/", EducationalProgramListView.as_view()),
]