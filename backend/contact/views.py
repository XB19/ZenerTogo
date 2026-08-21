from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    """N'importe qui peut envoyer un message ; seul l'admin peut les consulter/gérer."""

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['get', 'post', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

    @action(detail=True, methods=['post'], url_path='marquer-lu')
    def marquer_lu(self, request, pk=None):
        message = self.get_object()
        message.lu = True
        message.save(update_fields=['lu'])
        return Response(self.get_serializer(message).data)
