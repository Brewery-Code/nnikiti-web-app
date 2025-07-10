from django.urls import path

from .views import MainSliderView, StatisticBlockView, PartnersView, FAQView


urlpatterns = [
    path("main-slider-item/", MainSliderView.as_view(), name="main_slider_item"),
    path("statistic-block/", StatisticBlockView.as_view(), name="statistic-block"),
    path("partners/", PartnersView.as_view(), name="partners"),
    path("faq/", FAQView.as_view(), name="faq"),
]
