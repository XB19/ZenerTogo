from django.contrib import admin

from .models import Station


@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = ['nom', 'ville']
    search_fields = ['nom', 'ville']
    list_filter = ['ville']
