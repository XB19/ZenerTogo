from rest_framework import serializers

from .models import Actualite


class ActualiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actualite
        fields = ['id', 'titre', 'categorie', 'contenu', 'image', 'created_at', 'actif']
        read_only_fields = ['id', 'created_at']
