from django.contrib import admin

from .models import Actualite


@admin.register(Actualite)
class ActualiteAdmin(admin.ModelAdmin):
    list_display = ['titre', 'categorie', 'actif', 'created_at']
    list_filter = ['categorie', 'actif']
    search_fields = ['titre', 'contenu']
    date_hierarchy = 'created_at'
