from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import Actualite
from .serializers import ActualiteSerializer


class ActualiteViewSet(viewsets.ModelViewSet):
    """
    Lecture publique (actualités actives seulement pour les visiteurs
    anonymes) ; création/modification/suppression réservées à l'admin.
    """

    serializer_class = ActualiteSerializer

    def get_queryset(self):
        qs = Actualite.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(actif=True)
        return qs

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsAdminUser()]
