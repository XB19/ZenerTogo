from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'nom', 'email', 'telephone', 'sujet', 'message', 'lu', 'created_at']
        read_only_fields = ['id', 'lu', 'created_at']
