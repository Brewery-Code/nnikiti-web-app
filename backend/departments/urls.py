from django.urls import path

from departments.views import DepartmentListView, DepartmentDetailView, StaffListView

urlpatterns = [
    path('', DepartmentListView.as_view(), name='department-list'),
    path('<int:pk>/', DepartmentDetailView.as_view(), name='department-detail'),
    path('staff/', StaffListView.as_view(), name='staff-list'),
]
