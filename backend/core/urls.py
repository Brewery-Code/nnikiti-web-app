from django.urls import path

from .views import MainSliderView, StatisticBlockView

urlpatterns = [
    path("main-slider-item/", MainSliderView.as_view(), name="main_slider_item"),
    path("statistic-block/", StatisticBlockView.as_view(), name="statistic-block"),
]
