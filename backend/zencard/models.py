from django.db import models

from stations.models import Station


class DemandeZenCard(models.Model):
    """
    Repris du modèle Django historique (voir git show 3b64f8a:ZenerApp/models.py),
    avec `station_retrait` passée d'une liste `choices` figée (fausses
    stations "Zener Hedzranawoe"...) à une vraie ForeignKey vers `Station`.
    """

    TYPE_CHOIX = (
        ('Particulier', 'Particulier'),
        ('Entreprise', 'Entreprise'),
    )

    STATUT_CHOICES = (
        ('en_attente', 'En attente'),
        ('validee', 'Validée'),
        ('rejetee', 'Rejetée'),
    )

    nom = models.CharField(max_length=200)
    telephone = models.CharField(max_length=20)
    email = models.EmailField()
    ville = models.CharField(max_length=100)
    type_demande = models.CharField(max_length=20, choices=TYPE_CHOIX)
    station_retrait = models.ForeignKey(
        Station,
        on_delete=models.PROTECT,
        related_name='demandes_zencard',
    )
    cni = models.ImageField(upload_to='zencard/cni/')
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_creation']

    def __str__(self):
        return self.nom
