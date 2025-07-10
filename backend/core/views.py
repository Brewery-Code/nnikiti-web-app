from rest_framework.generics import ListAPIView

from .serializers import MainSliderItemSerializer, StatisticBlockSerializer, \
    PartnersSerializer, FAQSerializer
from .models import MainSliderItem, StatisticBlock, Partner, FAQ


class MainSliderView(ListAPIView):
    """Returns a list of all images in the main slider."""

    queryset = MainSliderItem.objects.all()
    serializer_class = MainSliderItemSerializer


class StatisticBlockView(ListAPIView):
    """Returns a list of all data in the statistic block"""

    queryset = StatisticBlock.objects.all()
    serializer_class = StatisticBlockSerializer


class PartnersView(ListAPIView):
    """Returns a list of all images in the partners."""
    queryset = Partner.objects.all()
    serializer_class = PartnersSerializer

class FAQView(ListAPIView):
    """Returns a list of all FAQ items."""
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer