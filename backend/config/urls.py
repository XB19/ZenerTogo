from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from careers.views import JobApplicationViewSet, JobOfferViewSet
from contact.views import ContactMessageViewSet
from content.views import ActualiteViewSet
from stations.views import StationViewSet
from zencard.views import DemandeZenCardViewSet

router = DefaultRouter()
router.register('actualites', ActualiteViewSet, basename='actualite')
router.register('offres', JobOfferViewSet, basename='offre')
router.register('candidatures', JobApplicationViewSet, basename='candidature')
router.register('contact', ContactMessageViewSet, basename='contact-message')
router.register('stations', StationViewSet, basename='station')
router.register('zencard/demandes', DemandeZenCardViewSet, basename='demande-zencard')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
