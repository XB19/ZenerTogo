from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    """Gestionnaire pour un `User` identifié par email (pas de username)."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("L'email est obligatoire.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Un superuser doit avoir is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Un superuser doit avoir is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Utilisateur unique pour les 4 profils du site (admin, agent back-office,
    client, public — ce dernier n'a pas de compte). `is_staff` donne accès à
    l'espace Admin ; les profils `BackOfficeAgent` / `ClientProfile`
    ci-dessous donnent accès aux deux autres espaces authentifiés.
    """

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.email

    def get_short_name(self):
        return self.first_name or self.email


class ClientProfile(models.Model):
    """
    Profil Portail Client — correspond à `customerProfile` dans
    frontend/src/data/clientPortalMockData.js. Détail complet (ZenCards,
    transactions, réclamations) prévu en Phase 3 ; le profil de base est
    posé maintenant pour que `accounts` reste le point d'entrée unique des
    3 profils authentifiés.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='client_profile')
    telephone = models.CharField(max_length=30, blank=True)
    ville = models.CharField(max_length=150, blank=True)
    adresse = models.CharField(max_length=255, blank=True)
    date_inscription = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Profil client — {self.user.email}'


class BackOfficeAgent(models.Model):
    """
    Profil agent Back-office Customer Care — correspond aux entrées
    `agents` dans frontend/src/data/backOfficeMockData.js. Détail complet
    (tickets, appels, affectations, SLA) prévu en Phase 3.
    """

    STATUT_CHOICES = (
        ('disponible', 'Disponible'),
        ('en_appel', 'En appel'),
        ('pause', 'Pause'),
        ('hors_ligne', 'Hors ligne'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='backoffice_agent')
    equipe = models.CharField(max_length=150, blank=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='hors_ligne')
    date_embauche = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'Agent — {self.user.email}'
