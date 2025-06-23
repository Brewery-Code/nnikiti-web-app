from django.urls import path

from .views import MainSliderView

urlpatterns = [
    path("main-slider-item/", MainSliderView.as_view(), name="main_slider_item"),
]
