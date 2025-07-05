from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Events
from .serializers import EventsSerializer


class EventsListView(ListAPIView):
    queryset = Events.published.all()
    serializer_class = EventsSerializer

class EventsDetailView(RetrieveAPIView):
    queryset = Events.published.all()
    serializer_class = EventsSerializer