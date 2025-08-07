from rest_framework.generics import ListAPIView

from .serializers import MainSliderItemSerializer, StatisticBlockSerializer, \
    PartnersSerializer, FAQSerializer, AlumnusSerializer, AlumniSliderSerializer
from .models import MainSliderItem, StatisticBlock, Partner, FAQ, Alumnus, AlumniSlider


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


class AlumnusView(ListAPIView):
    """Returns a list of all Alumni."""
    queryset = Alumnus.objects.all()
    serializer_class = AlumnusSerializer


class AlumniSliderView(ListAPIView):
    """Returns a list of all AlumniSlider."""
    queryset = AlumniSlider.objects.all()
    serializer_class = AlumniSliderSerializer