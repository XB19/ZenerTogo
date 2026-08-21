from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import JobApplication, JobOffer
from .serializers import JobApplicationSerializer, JobOfferSerializer


class JobOfferViewSet(viewsets.ModelViewSet):
    """Lecture publique (offres actives seulement pour les visiteurs) ; gestion réservée à l'admin."""

    serializer_class = JobOfferSerializer

    def get_queryset(self):
        qs = JobOffer.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(actif=True)
        return qs

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsAdminUser()]


class JobApplicationViewSet(viewsets.ModelViewSet):
    """
    Un candidat (public, non authentifié) peut déposer une candidature.
    Seul l'admin peut lister/consulter/supprimer les candidatures et les
    marquer comme traitées.
    """

    queryset = JobApplication.objects.select_related('offre').all()
    serializer_class = JobApplicationSerializer
    http_method_names = ['get', 'post', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

    @action(detail=True, methods=['post'], url_path='marquer-traitee')
    def marquer_traitee(self, request, pk=None):
        candidature = self.get_object()
        candidature.traitee = True
        candidature.save(update_fields=['traitee'])
        return Response(self.get_serializer(candidature).data)
