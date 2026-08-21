from django.contrib import admin

from .models import DemandeZenCard


@admin.register(DemandeZenCard)
class DemandeZenCardAdmin(admin.ModelAdmin):
    list_display = ['nom', 'type_demande', 'station_retrait', 'statut', 'date_creation']
    list_filter = ['statut', 'type_demande']
    search_fields = ['nom', 'email', 'telephone']
    autocomplete_fields = ['station_retrait']
