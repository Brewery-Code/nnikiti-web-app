from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Event
from .serializers import EventsSerializer


class EventsListView(ListAPIView):
    """API view to retrieve a list of published events."""
    queryset = Event.published.all()
    serializer_class = EventsSerializer

class EventsDetailView(RetrieveAPIView):
    """API view to retrieve a single published event by its ID."""
    queryset = Event.published.all()
    serializer_class = EventsSerializer