from rest_framework import serializers

from stations.serializers import StationSerializer

from .models import DemandeZenCard


class DemandeZenCardSerializer(serializers.ModelSerializer):
    station_retrait_detail = StationSerializer(source='station_retrait', read_only=True)

    class Meta:
        model = DemandeZenCard
        fields = [
            'id', 'nom', 'telephone', 'email', 'ville', 'type_demande',
            'station_retrait', 'station_retrait_detail', 'cni', 'statut', 'date_creation',
        ]
        read_only_fields = ['id', 'statut', 'date_creation']
