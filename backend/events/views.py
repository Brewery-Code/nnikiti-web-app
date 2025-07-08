from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Events
from .serializers import EventsSerializer


class EventsListView(ListAPIView):
    """API view to retrieve a list of published events."""
    queryset = Events.published.all()
    serializer_class = EventsSerializer

class EventsDetailView(RetrieveAPIView):
    """API view to retrieve a single published event by its ID."""
    queryset = Events.published.all()
    serializer_class = EventsSerializer