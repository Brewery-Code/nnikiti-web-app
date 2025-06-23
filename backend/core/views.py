from rest_framework.generics import ListAPIView

from .serializers import MainSliderItemSerializer
from .models import MainSliderItem


class MainSliderView(ListAPIView):
    """ListApiView для отримання всіх фото слайдера"""

    queryset = MainSliderItem.objects.all()
    serializer_class = MainSliderItemSerializer
