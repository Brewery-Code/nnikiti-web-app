from django.shortcuts import render
from rest_framework.generics import ListAPIView

from .models import Events
from .serializers import EventsSerializer


class EventsView(ListAPIView):
    queryset = Events.published.all()
    serializer_class = EventsSerializer
