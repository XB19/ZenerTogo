from django.db import models


class ContactMessage(models.Model):
    """Repris du modèle Django historique (voir git show 3b64f8a:ZenerApp/models.py)."""

    nom = models.CharField(max_length=255)
    email = models.EmailField()
    telephone = models.CharField(max_length=100, blank=True)
    sujet = models.CharField(max_length=255)
    message = models.TextField()
    lu = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.nom} - {self.sujet}'
