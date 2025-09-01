import logging

from django.db.models.functions import ExtractYear
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import MainSliderItemSerializer, StatisticBlockSerializer, \
    PartnersSerializer, FAQSerializer, AlumnusSerializer, AlumniSliderSerializer
from .models import MainSliderItem, StatisticBlock, Partner, FAQ, Alumnus, AlumniSlider


logger = logging.getLogger(__name__)


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
    serializer_class = AlumnusSerializer

    def get_queryset(self):
        queryset = Alumnus.objects.all()
        year = self.request.GET.get('year')

        if year is not None:
            try:
               year = int(year)
               queryset = queryset.filter(date_of_graduation__year=year)
            except ValueError as e:
                logger.warning(f"Invalid year filter: {year}")
        return queryset



class GraduationYearsView(APIView):
    """
    Returns a list of all Graduation years.
    """
    def get(self, request):
        try:
            years = (Alumnus.objects.annotate(year=ExtractYear("date_of_graduation")).values_list("year", flat=True)
                     .distinct().order_by("-year"))

            return Response(years)
        except ValueError as e:
            logger.exception(f"Failed to fetch graduation years.")
            return Response({"detail": "Internal server error"}, status=500)


class AlumniSliderView(ListAPIView):
    """Returns a list of all AlumniSlider."""
    queryset = AlumniSlider.objects.all()
    serializer_class = AlumniSliderSerializer