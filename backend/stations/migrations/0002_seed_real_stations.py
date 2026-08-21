"""
Alimente la table Station avec le vrai réseau (repris de
frontend/src/data/stations.js, fourni par le client) au lieu des fausses
stations "Zener Hedzranawoe"... du modèle Django historique.
"""
from django.db import migrations

STATIONS = [
    ('Oasis Agoè', 'Lomé'),
    ('Oasis Agoè Télessou', 'Lomé'),
    ('Oasis Nyékonakpoé', 'Lomé'),
    ('Oasis Ramatou', 'Lomé'),
    ('Oasis TAM-TAM', 'Lomé'),
    ('Oasis Aného', 'Aného'),
    ('Oasis Tsévié', 'Tsévié'),
    ('Oasis Kpalimé', 'Kpalimé'),
    ('Oasis Atakpamé', 'Atakpamé'),
    ('Oasis Blitta', 'Blitta'),
    ('Oasis Kara', 'Kara'),
]


def seed_stations(apps, schema_editor):
    Station = apps.get_model('stations', 'Station')
    for nom, ville in STATIONS:
        Station.objects.get_or_create(nom=nom, ville=ville)


def remove_seeded_stations(apps, schema_editor):
    Station = apps.get_model('stations', 'Station')
    Station.objects.filter(nom__in=[nom for nom, _ in STATIONS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_stations, remove_seeded_stations),
    ]
