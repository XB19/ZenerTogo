from django.contrib import admin

from .models import JobApplication, JobOffer


@admin.register(JobOffer)
class JobOfferAdmin(admin.ModelAdmin):
    list_display = ['titre', 'ville', 'type_contrat', 'actif', 'date_limite', 'created_at']
    list_filter = ['type_contrat', 'actif', 'ville']
    search_fields = ['titre', 'description']


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['nom', 'offre', 'email', 'traitee', 'created_at']
    list_filter = ['traitee']
    search_fields = ['nom', 'email']
    autocomplete_fields = ['offre']
