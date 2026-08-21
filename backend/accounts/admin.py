from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import BackOfficeAgent, ClientProfile, User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    ordering = ['email']
    list_display = ['email', 'first_name', 'last_name', 'is_staff', 'is_active']
    search_fields = ['email', 'first_name', 'last_name']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informations personnelles', {'fields': ('first_name', 'last_name')}),
        ('Droits', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    readonly_fields = ['date_joined', 'last_login']


@admin.register(ClientProfile)
class ClientProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'telephone', 'ville', 'date_inscription']
    search_fields = ['user__email', 'telephone', 'ville']


@admin.register(BackOfficeAgent)
class BackOfficeAgentAdmin(admin.ModelAdmin):
    list_display = ['user', 'equipe', 'statut', 'date_embauche']
    list_filter = ['statut', 'equipe']
    search_fields = ['user__email', 'equipe']
