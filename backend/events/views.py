from rest_framework.generics import ListAPIView, RetrieveAPIView
from drf_spectacular.utils import extend_schema

from .models import Event
from .serializers import EventsSerializer


@extend_schema(tags=['Events'])
class EventsListView(ListAPIView):
    """API view to retrieve a list of published events."""
    queryset = Event.published.all()
    serializer_class = EventsSerializer


@extend_schema(tags=['Events'])
class EventsDetailView(RetrieveAPIView):
    """API view to retrieve a single published event by its ID."""
    queryset = Event.published.all()
    serializer_class = EventsSerializer