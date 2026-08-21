from rest_framework import serializers

from .models import JobApplication, JobOffer


class JobOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOffer
        fields = [
            'id', 'titre', 'ville', 'type_contrat', 'departement',
            'description', 'missions', 'profil', 'date_limite', 'actif', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            'id', 'offre', 'nom', 'email', 'telephone', 'message',
            'cv', 'lettre_motivation', 'traitee', 'created_at',
        ]
        # `traitee` ne se change pas à la création (candidat public) : voir
        # l'action `marquer_traitee` du viewset, réservée à l'admin.
        read_only_fields = ['id', 'traitee', 'created_at']
