# ZENER — Backend (Phase 1)

API REST Django pour le site ZENER. Le frontend React (`frontend/`) est une
SPA découplée : ce backend n'expose que du JSON (`/api/...`), pas de
templates côté site public.

## Portée de cette phase

Modules couverts : actualités, offres d'emploi + candidatures, messages de
contact, demandes ZenCard, stations (liste minimale). Voir
`C:\Users\HP\.claude\plans\enumerated-fluttering-hanrahan.md` pour le détail
et les phases suivantes (boutique/commandes, portail client, back-office
customer care).

## Démarrer en local

### Avec Docker (recommandé — Postgres inclus)

```bash
cp backend/.env.example backend/.env   # adapter si besoin
docker compose up
```

L'API est servie sur `http://localhost:8000/api/`, l'admin Django sur
`http://localhost:8000/admin/`.

### Sans Docker (Postgres local ou SQLite)

```bash
cd backend
python -m venv .venv && .venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env   # sans DATABASE_URL -> retombe sur SQLite local
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Profils & connexion

Un seul modèle `User` (identifiant = email), trois endpoints de connexion
distincts qui vérifient chacun le bon profil avant de délivrer un JWT :

- `POST /api/auth/admin/login/` — nécessite `is_staff=True`.
- `POST /api/auth/agent/login/` — nécessite un profil `BackOfficeAgent` lié.
- `POST /api/auth/client/login/` — nécessite un profil `ClientProfile` lié.
- `POST /api/auth/token/refresh/` — renouvelle un access token.

Body : `{"email": "...", "password": "..."}`. Réponse : `{"access": "...", "refresh": "..."}`.
Les profils `BackOfficeAgent`/`ClientProfile` eux-mêmes (et leurs endpoints
métier) arrivent en Phase 3 ; pour l'instant seul le profil Admin a des
comptes utilisables (`python manage.py createsuperuser`).

## Endpoints

| Endpoint | Public | Admin |
|---|---|---|
| `GET /api/actualites/`, `/api/offres/`, `/api/stations/` | Lecture | CRUD complet |
| `POST /api/contact/` | Créer | Lister/consulter + `POST .../{id}/marquer-lu/` |
| `POST /api/candidatures/` (multipart : `cv`, `lettre_motivation`) | Créer | Lister/consulter + `POST .../{id}/marquer-traitee/` |
| `POST /api/zencard/demandes/` (multipart : `cni`) | Créer | Lister/consulter + `POST .../{id}/valider/` ou `/rejeter/` |

Les données de lecture publique ne montrent que le contenu actif
(`actif=True` pour actualités/offres).
