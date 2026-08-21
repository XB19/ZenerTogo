from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Station
from .serializers import StationSerializer


class StationViewSet(viewsets.ReadOnlyModelViewSet):
    """Liste publique — sert par ex. le sélecteur de station du formulaire ZenCard."""

    queryset = Station.objects.all()
    serializer_class = StationSerializer
    permission_classes = [AllowAny]
