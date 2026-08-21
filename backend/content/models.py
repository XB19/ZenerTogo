from django.db import models


class Actualite(models.Model):
    """Repris du modèle Django historique (voir git show 3b64f8a:ZenerApp/models.py)."""

    titre = models.CharField(max_length=255)
    categorie = models.CharField(max_length=100)
    contenu = models.TextField()
    image = models.ImageField(upload_to='actualites/')
    created_at = models.DateTimeField(auto_now_add=True)
    actif = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.titre
