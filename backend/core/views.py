from django.db.models.functions import ExtractYear
from rest_framework import status, permissions
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, OpenApiResponse
from drf_spectacular.types import OpenApiTypes

from .serializers import MainSliderItemSerializer, StatisticBlockSerializer, \
    PartnersSerializer, FAQSerializer, AlumnusSerializer, AlumniSliderSerializer, AlumnusCreateSerializer
from .models import MainSliderItem, StatisticBlock, Partner, FAQ, Alumnus, AlumniSlider


@extend_schema(tags=['Core'])
class MainSliderView(ListAPIView):
    """Returns a list of all images in the main slider."""

    queryset = MainSliderItem.objects.all()
    serializer_class = MainSliderItemSerializer


@extend_schema(tags=['Core'])
class StatisticBlockView(ListAPIView):
    """Returns a list of all data in the statistic block"""

    queryset = StatisticBlock.objects.all()
    serializer_class = StatisticBlockSerializer


@extend_schema(tags=['Core'])
class PartnersView(ListAPIView):
    """Returns a list of all images in the partners."""
    queryset = Partner.objects.all()
    serializer_class = PartnersSerializer


@extend_schema(tags=['Core'])
class FAQView(ListAPIView):
    """Returns a list of all FAQ items."""
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


@extend_schema(tags=['Core'])
class AlumnusView(APIView):
    """
    GET: Returns a list of all Alumni.
    POST: Create a new Alumnus (Ukrainian translation only)
    """
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = Alumnus.published.all()
        year = self.request.GET.get('year')

        if year is not None:
            try:
               year = int(year)
               queryset = queryset.filter(date_of_graduation__year=year)
            except ValueError:
                pass
        return queryset

    def get(self, request):
        queryset = self.get_queryset()
        serializer = AlumnusSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AlumnusCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            alumnus = serializer.save()
            return Response({"id:": alumnus.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@extend_schema(
    tags=['Core'],
    summary='Список років випуску',
    description='Повертає унікальні роки випуску у спадному порядку. Використовується для фільтрації випускників.',
    responses={200: OpenApiResponse(
        response=OpenApiTypes.INT,
        description='Список років, наприклад: [2024, 2023, 2022]',
    )},
)
class GraduationYearsView(APIView):
    """
    Returns a list of all Graduation years.
    """
    def get(self, request):
        years = (Alumnus.objects.annotate(year=ExtractYear("date_of_graduation")).values_list("year", flat=True)
                 .distinct().order_by("-year"))

        return Response(years)


@extend_schema(tags=['Core'])
class AlumniSliderView(ListAPIView):
    """Returns a list of all AlumniSlider."""
    queryset = AlumniSlider.objects.all()
    serializer_class = AlumniSliderSerializer