from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import DemandeZenCard
from .serializers import DemandeZenCardSerializer


class DemandeZenCardViewSet(viewsets.ModelViewSet):
    """N'importe qui peut déposer une demande ; seul l'admin peut les consulter/traiter."""

    queryset = DemandeZenCard.objects.select_related('station_retrait').all()
    serializer_class = DemandeZenCardSerializer
    http_method_names = ['get', 'post', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

    def _set_statut(self, request, pk, statut):
        demande = self.get_object()
        demande.statut = statut
        demande.save(update_fields=['statut'])
        return Response(self.get_serializer(demande).data)

    @action(detail=True, methods=['post'])
    def valider(self, request, pk=None):
        return self._set_statut(request, pk, 'validee')

    @action(detail=True, methods=['post'])
    def rejeter(self, request, pk=None):
        return self._set_statut(request, pk, 'rejetee')
