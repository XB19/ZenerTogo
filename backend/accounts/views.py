from rest_framework import generics, status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    AdminTokenObtainPairSerializer,
    AgentTokenObtainPairSerializer,
    ClientProfileSerializer,
    ClientRegisterSerializer,
    ClientTokenObtainPairSerializer,
)


class AdminLoginView(TokenObtainPairView):
    """POST {email, password} -> {access, refresh}. Réservé à `is_staff`."""

    serializer_class = AdminTokenObtainPairSerializer


class AgentLoginView(TokenObtainPairView):
    """POST {email, password} -> {access, refresh}. Réservé aux agents back-office."""

    serializer_class = AgentTokenObtainPairSerializer


class ClientLoginView(TokenObtainPairView):
    """POST {email, password} -> {access, refresh}. Réservé aux clients du portail."""

    serializer_class = ClientTokenObtainPairSerializer


class ClientRegisterView(generics.CreateAPIView):
    """
    Inscription publique du Portail Client. Crée le `User` + `ClientProfile`
    et connecte immédiatement le compte (renvoie un JWT), pas de validation
    admin préalable.
    """

    serializer_class = ClientRegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.save()

        refresh = RefreshToken.for_user(profile.user)
        data = ClientProfileSerializer(profile).data
        data['access'] = str(refresh.access_token)
        data['refresh'] = str(refresh)
        return Response(data, status=status.HTTP_201_CREATED)


class ClientMeView(generics.RetrieveUpdateAPIView):
    """Consultation/mise à jour du profil du client connecté."""

    serializer_class = ClientProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile = getattr(self.request.user, 'client_profile', None)
        if profile is None:
            raise NotFound("Ce compte n'a pas de profil client.")
        return profile
