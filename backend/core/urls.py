from django.urls import path

from .views import MainSliderView, StatisticBlockView, PartnersView, FAQView
from departments.views import EducationalProgramListAPIView


urlpatterns = [
    path("main-slider-items/", MainSliderView.as_view(), name="main_slider_items"),
    path("statistic-block/", StatisticBlockView.as_view(), name="statistic-block"),
    path("partners/", PartnersView.as_view(), name="partners"),
    path("faq/", FAQView.as_view(), name="faq"),
    path("educational-programs/", EducationalProgramListAPIView.as_view(), name="educational-programs"),
]
