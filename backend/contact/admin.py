from django.contrib import admin

from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['nom', 'sujet', 'email', 'lu', 'created_at']
    list_filter = ['lu']
    search_fields = ['nom', 'email', 'sujet', 'message']
