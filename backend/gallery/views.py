from rest_framework import generics
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema, OpenApiParameter

from .models import Album
from .serializers import AlbumListSerializer, AlbumDetailSerializer


@extend_schema(
    tags=["Gallery"],
    parameters=[
        OpenApiParameter("year", int, description="Filter by exact year"),
        OpenApiParameter("year_from", int, description="Filter from year"),
        OpenApiParameter("year_to", int, description="Filter to year"),
    ],
)
class AlbumListView(generics.ListAPIView):
    serializer_class = AlbumListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Album.objects.filter(status=Album.Status.PUBLISHED)
        year = self.request.query_params.get("year")
        year_from = self.request.query_params.get("year_from")
        year_to = self.request.query_params.get("year_to")

        if year:
            qs = qs.filter(date__year=year)
        if year_from:
            qs = qs.filter(date__year__gte=year_from)
        if year_to:
            qs = qs.filter(date__year__lte=year_to)

        return qs


@extend_schema(tags=["Gallery"])
class AlbumDetailView(generics.RetrieveAPIView):
    serializer_class = AlbumDetailSerializer
    permission_classes = [AllowAny]
    queryset = Album.objects.filter(status=Album.Status.PUBLISHED)
