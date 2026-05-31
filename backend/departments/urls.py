from django.urls import path

from departments.views import DepartmentListView, DepartmentDetailView

urlpatterns = [
    path('', DepartmentListView.as_view(), name='department-list'),
    path('<int:pk>/', DepartmentDetailView.as_view(), name='department-detail'),
]
