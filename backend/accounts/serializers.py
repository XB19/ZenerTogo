from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import ClientProfile, User


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Login par email (le `User` du projet n'a pas de username)."""

    username_field = User.USERNAME_FIELD


class AdminTokenObtainPairSerializer(EmailTokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_staff:
            raise serializers.ValidationError("Ce compte n'a pas accès à l'espace admin.")
        return data


class AgentTokenObtainPairSerializer(EmailTokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not hasattr(self.user, 'backoffice_agent'):
            raise serializers.ValidationError("Ce compte n'a pas accès à l'espace back-office.")
        return data


class ClientTokenObtainPairSerializer(EmailTokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not hasattr(self.user, 'client_profile'):
            raise serializers.ValidationError("Ce compte n'a pas accès au portail client.")
        return data


class ClientProfileSerializer(serializers.ModelSerializer):
    """
    Profil du portail client — combine `User` (prenom/nom/email) et
    `ClientProfile` (telephone/ville/adresse) dans un seul objet plat, pour
    correspondre à la forme de `customerProfile` côté frontend
    (frontend/src/data/clientPortalMockData.js).
    """

    prenom = serializers.CharField(source='user.first_name', max_length=150)
    nom = serializers.CharField(source='user.last_name', max_length=150)
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = ClientProfile
        fields = ['prenom', 'nom', 'email', 'telephone', 'ville', 'adresse', 'date_inscription']
        read_only_fields = ['date_inscription']

    def validate_email(self, value):
        value = value.lower()
        qs = User.objects.filter(email=value)
        if self.instance is not None:
            qs = qs.exclude(pk=self.instance.user_id)
        if qs.exists():
            raise serializers.ValidationError("Un compte existe déjà avec cet email.")
        return value

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        if user_data:
            user = instance.user
            for field, value in user_data.items():
                setattr(user, field, value)
            user.save(update_fields=list(user_data.keys()))
        return super().update(instance, validated_data)


class ClientRegisterSerializer(serializers.Serializer):
    """Inscription publique libre : le compte est actif immédiatement."""

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    prenom = serializers.CharField(max_length=150)
    nom = serializers.CharField(max_length=150)
    telephone = serializers.CharField(max_length=30, required=False, allow_blank=True)
    ville = serializers.CharField(max_length=150, required=False, allow_blank=True)
    adresse = serializers.CharField(max_length=255, required=False, allow_blank=True)

    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Un compte existe déjà avec cet email.")
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['prenom'],
            last_name=validated_data['nom'],
        )
        return ClientProfile.objects.create(
            user=user,
            telephone=validated_data.get('telephone', ''),
            ville=validated_data.get('ville', ''),
            adresse=validated_data.get('adresse', ''),
        )
