from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import AdminLoginView, AgentLoginView, ClientLoginView, ClientMeView, ClientRegisterView

urlpatterns = [
    path('admin/login/', AdminLoginView.as_view(), name='auth-admin-login'),
    path('agent/login/', AgentLoginView.as_view(), name='auth-agent-login'),
    path('client/login/', ClientLoginView.as_view(), name='auth-client-login'),
    path('client/register/', ClientRegisterView.as_view(), name='auth-client-register'),
    path('client/me/', ClientMeView.as_view(), name='auth-client-me'),
    path('token/refresh/', TokenRefreshView.as_view(), name='auth-token-refresh'),
]
