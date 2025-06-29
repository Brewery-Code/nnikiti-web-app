from rest_framework.generics import ListAPIView

from .serializers import MainSliderItemSerializer, StatisticBlockSerializer
from .models import MainSliderItem, StatisticBlock


class MainSliderView(ListAPIView):
    """Returns a list of all images in the main slider."""

    queryset = MainSliderItem.objects.all()
    serializer_class = MainSliderItemSerializer


class StatisticBlockView(ListAPIView):
    """Returns a list of all data in the statistic block"""

    queryset = StatisticBlock.objects.all()
    serializer_class = StatisticBlockSerializer
