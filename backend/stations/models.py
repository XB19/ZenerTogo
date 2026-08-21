from django.db import models


class Station(models.Model):
    """
    Version minimale — juste de quoi rattacher une `DemandeZenCard` à une
    vraie station (Phase 1). Le modèle complet (lat/lng, adresse, téléphone,
    description bilingue — voir frontend/src/data/stations.js) arrive en
    Phase 2 pour alimenter la page /stations et sa carte.
    """

    nom = models.CharField(max_length=150)
    ville = models.CharField(max_length=100)

    class Meta:
        ordering = ['nom']

    def __str__(self):
        return f'{self.nom} — {self.ville}'
