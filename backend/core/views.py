from rest_framework.generics import ListAPIView

from .serializers import MainSliderItemSerializer
from .models import MainSliderItem


class MainSliderView(ListAPIView):
    """Returns a list of all images in the main slider."""

    queryset = MainSliderItem.objects.all()
    serializer_class = MainSliderItemSerializer
