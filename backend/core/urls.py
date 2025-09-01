from django.urls import path

from .views import (MainSliderView, StatisticBlockView, PartnersView, FAQView, AlumnusView, AlumniSliderView,
                    GraduationYearsView)


urlpatterns = [
    path("main-slider-items/", MainSliderView.as_view(), name="main_slider_items"),
    path("statistic-block/", StatisticBlockView.as_view(), name="statistic-block"),
    path("partners/", PartnersView.as_view(), name="partners"),
    path("faq/", FAQView.as_view(), name="faq"),
    path("alumni/", AlumnusView.as_view(), name="alumni"),
    path("alumni/years/", GraduationYearsView.as_view(), name="alumni-years"),
    path("alumni-slider-items/", AlumniSliderView.as_view(), name="alumni_slider_items"),
]
