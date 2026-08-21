from django.db import models


class JobOffer(models.Model):
    """Repris du modèle Django historique (voir git show 3b64f8a:ZenerApp/models.py)."""

    CONTRATS = (
        ('CDI', 'CDI'),
        ('CDD', 'CDD'),
        ('Stage', 'Stage'),
        ('Temps plein', 'Temps plein'),
        ('Temps partiel', 'Temps partiel'),
    )

    titre = models.CharField(max_length=255)
    ville = models.CharField(max_length=150)
    type_contrat = models.CharField(max_length=50, choices=CONTRATS)
    departement = models.CharField(max_length=150, blank=True)
    description = models.TextField()
    missions = models.TextField()
    profil = models.TextField()
    date_limite = models.DateField(null=True, blank=True)
    actif = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.titre


class JobApplication(models.Model):
    offre = models.ForeignKey(
        JobOffer,
        on_delete=models.CASCADE,
        related_name='candidatures',
        null=True,
        blank=True,
        help_text='Vide pour une candidature spontanée.',
    )
    nom = models.CharField(max_length=255)
    email = models.EmailField()
    telephone = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    cv = models.FileField(upload_to='candidatures/cv/')
    lettre_motivation = models.FileField(upload_to='candidatures/lettres/', blank=True, null=True)
    traitee = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.nom
