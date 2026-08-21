# ZENER — Frontend React

Application React (Vite) ZENER, organisée en **3 espaces** :

1. **Site public** — Présentation ZENER, Services, Stations, ZenCard,
   Actualités, FAQ, Contact, Boutique, Carrières, Bon plan.
2. **Portail client** (`/portail-client`) — espace personnel authentifié pour
   les clients : profil, ZenCards, transactions, réclamations.
3. **Back-office Customer Care** (`/back-office`) — outil interne pour les
   agents : agents, appels, tickets, affectations, SLA, ZenCard, SAP,
   statistiques, reporting.

Le panneau **admin** (`/admin-panel`, gestion de contenu : offres, actualités,
messages, demandes ZenCard) est un quatrième espace, antérieur à cette
structure à 3 niveaux et conservé tel quel.

Les 4 espaces sont visuellement identiques (même charte ZENER) mais
techniquement isolés : CSS scopé séparément, et **authentification propre à
chacun** (voir plus bas) — un client ne peut pas accéder au back-office avec
son compte, et inversement.

Le rendu du site public et de l'admin reproduit à l'identique l'original
Django (backend entièrement retiré du dépôt, voir plus bas) ; le portail
client et le back-office sont des espaces neufs, sans équivalent Django,
construits avec le même langage visuel pour rester cohérents.

## Lancer le projet

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:5173`.

| Espace | URL de connexion | Identifiants de démo |
|---|---|---|
| Site public | `/` | — |
| Portail client | `/portail-client/connexion` | n'importe quel email / mot de passe non vide |
| Back-office Customer Care | `/back-office/connexion` | `agent` / `agent` |
| Admin (gestion de contenu) | `/admin/login` | `admin` / `admin` |

## Structure

```
src/
  pages/            site public : une page par route (dont FAQ.jsx, nouvelle)
  components/        Navbar, Footer, Counter, TestimonialSlider (site public)
  styles/global.css  styles partagés du site public, scopés .client-app
  data/mockData.js   données factices du site public (offres, actualités...)

  admin/              panneau admin (gestion de contenu) — voir plus bas
  data/adminMockData.js

  portal/             PORTAIL CLIENT (nouveau)
    ClientAuthContext.jsx    authentification factice, clé localStorage dédiée
    ClientDataContext.jsx    store en mémoire (ZenCards, transactions,
                              réclamations) + addReclamation()
    ClientPortalLayout.jsx/.css  en-tête + onglets, scopé .client-portal-app
    RequireClientAuth.jsx    garde de route (redirige vers .../connexion)
    pages/
      ClientLogin.jsx, Profile.jsx, MyZencards.jsx, MyTransactions.jsx,
      ReclamationsList.jsx, ReclamationCreate.jsx, ReclamationDetail.jsx
      ClientPortalPages.css  composants partagés (cartes, tableaux, badges),
                              classes préfixées .cp-, importé par ces 6 pages
  data/clientPortalMockData.js

  backoffice/          BACK-OFFICE CUSTOMER CARE (nouveau)
    BackOfficeAuthContext.jsx / BackOfficeDataContext.jsx  même principe que
                              portal/, store CRUD : assignTicket(),
                              updateTicketStatut()
    BackOfficeLayout.jsx/.css   sidebar + topbar, cloné de admin/AdminLayout
                              (même look), scopé .backoffice-app
    RequireBackOfficeAuth.jsx
    pages/
      BackOfficeLogin.jsx, BODashboard.jsx, Agents.jsx, Appels.jsx,
      Tickets.jsx, Affectations.jsx, SLA.jsx, BOZencard.jsx, SAP.jsx,
      Statistiques.jsx, Reporting.jsx
      BackOfficePages.css   composants partagés, importé par ces 10 pages
  data/backOfficeMockData.js
```

Chaque espace authentifié (`admin/`, `portal/`, `backoffice/`) répète
volontairement le même triplet **AuthContext + DataContext + Layout +
RequireXAuth** : c'est le patron déjà validé pour l'admin, dupliqué tel quel
plutôt que factorisé, pour que les trois espaces restent indépendants et
qu'on puisse faire évoluer (ou remplacer par une vraie API) l'un sans risquer
de casser les deux autres.

## Authentification (factice, une par espace)

Chacun des 3 espaces authentifiés a son propre contexte d'auth et sa propre
clé `localStorage` (`zener_admin_user`, `zener_client_user`,
`zener_backoffice_user`) : se connecter à l'un ne connecte pas aux autres, et
les routes de chaque espace sont protégées indépendamment (`RequireAdminAuth`,
`RequireClientAuth`, `RequireBackOfficeAuth`), chacune redirigeant vers sa
propre page de connexion.

### Admin (gestion de contenu)

`src/admin/AdminAuthContext.jsx` simule la session Django (`login_required` +
`user.is_staff`) avec un état stocké en `localStorage`. Identifiants de démo :
`admin` / `admin` (n'importe quel couple non vide fonctionne aussi). Toutes
les routes `/admin-panel/...` sont protégées par `RequireAdminAuth`, qui
redirige vers `/admin/login` si non connecté — exactement le comportement de
`@login_required(login_url='admin_login')` côté Django.

**TODO** : remplacer par de vrais appels à l'API Django (session ou JWT) une
fois PostgreSQL branché.

### Portail client

`src/portal/ClientAuthContext.jsx` — n'importe quel email / mot de passe non
vide connecte un client de démo (profil `src/data/clientPortalMockData.js`).
Routes `/portail-client/...` (sauf `/connexion`) protégées par
`RequireClientAuth`.

### Back-office Customer Care

`src/backoffice/BackOfficeAuthContext.jsx` — identifiants de démo `agent` /
`agent` (n'importe quel couple non vide fonctionne aussi). Routes
`/back-office/...` (sauf `/connexion`) protégées par `RequireBackOfficeAuth`.

## Données et actions CRUD (factices)

`src/admin/AdminDataContext.jsx` fournit un store en mémoire (state React,
non persisté) pour que le panneau d'administration soit utilisable de bout en
bout : créer/modifier/supprimer une offre, publier/supprimer une actualité,
valider/rejeter une demande ZenCard, marquer un message comme lu. Chaque
fonction est commentée `// TODO` à l'endroit exact où brancher le vrai appel
API PostgreSQL. Les données de départ viennent de `src/data/adminMockData.js`,
avec la même forme que les modèles Django (`JobApplication`, `ContactMessage`,
`DemandeZenCard`).

`src/portal/ClientDataContext.jsx` (ZenCards, transactions, réclamations —
`addReclamation()` fait vraiment apparaître la nouvelle réclamation dans la
liste et sa page de suivi) et `src/backoffice/BackOfficeDataContext.jsx`
(tickets, affectations — `assignTicket()` et `updateTicketStatut()` mettent
vraiment à jour le tableau des tickets) suivent exactement le même principe,
avec leurs propres `// TODO`.

## Pourquoi chaque page a son propre fichier CSS scopé

Django charge le `<style>` de chaque template séparément à chaque requête (et
le panneau admin ne charge même jamais le CSS du site public), donc de
nombreuses pages — publiques et admin confondues — réutilisent les mêmes noms
de classe (`.container`, `.section-title`, `.page-header`, `.table-card`,
`.logo`...) avec des valeurs différentes sans jamais se marcher dessus. Dans
une SPA React, tous les CSS sont chargés ensemble en permanence : sans
précaution, le `.logo` de la sidebar admin aurait par exemple écrasé celui du
header du site public.

Le même principe s'applique aux 4 espaces : `src/styles/global.css` (site
public) est préfixé `.client-app`, `src/admin/AdminLayout.css` est préfixé
`.admin-app`, `src/portal/ClientPortalLayout.css` est préfixé
`.client-portal-app`, `src/backoffice/BackOfficeLayout.css` est préfixé
`.backoffice-app`. Chaque layout (`ClientLayout`, `AdminLayout`,
`ClientPortalLayout`, `BackOfficeLayout`) enveloppe son contenu dans la div
correspondante, donc les 4 espaces ne peuvent jamais se marcher dessus.

À l'intérieur de chaque espace, deux stratégies selon l'origine du code :

1. **Pages portées depuis Django** (site public, admin) : chaque
   `src/pages/X.css` / `src/admin/pages/X.css` est préfixé individuellement
   (`.page-x` / `.admin-page-x`), parce que ces pages ont été extraites une
   par une de templates Django qui réutilisaient déjà les mêmes noms de
   classe (`.container`, `.section-title`, `.page-header`, `.table-card`...)
   avec des valeurs différentes selon la page.
2. **Pages neuves** (portail client, back-office) : plutôt que de porter un
   CSS existant page par page, chaque espace a un **unique fichier de
   composants partagés** (`ClientPortalPages.css` classes `.cp-*`,
   `BackOfficePages.css` classes `.page-header`/`.card`/`.table`/`.badge-*`
   qui reprennent le vocabulaire déjà utilisé dans `admin/pages/*.css`) —
   plus rapide à écrire et cohérent par construction, puisqu'il n'y a qu'une
   seule définition de chaque classe à l'intérieur de l'espace.

C'est fait une fois pour toutes via `scripts/scope-css.cjs` (le script est
idempotent — le relancer sur un fichier déjà préfixé ne double pas le
préfixe). Si vous ajoutez ou modifiez un fichier CSS de page à la main,
relancez-le sur le dossier concerné :

```bash
node scripts/scope-css.cjs src/pages page
node scripts/scope-css.cjs src/admin/pages admin-page
```

(`global.css`, `Navbar.css` et `AdminLayout.css` ont été préfixés une fois à
la main avec un préfixe fixe — `.client-app` / `.admin-app` — plutôt que par
le script, puisqu'ils doivent tous partager exactement le même préfixe au
lieu d'un préfixe par fichier.)

## Fidélité au design

Le CSS/HTML a été repris à l'identique du site Django, y compris certains
comportements existants :
- images de remplacement manquantes (logos partenaires, produits boutique) ;
- `.process-number` sans effet sur la page Services, la classe n'étant pas
  appliquée dans le HTML d'origine ;
- aucun état "actif" sur les liens de la sidebar admin, et le titre de la
  topbar reste toujours "Tableau de bord" quelle que soit la page — l'admin
  Django d'origine ne les met jamais à jour non plus ;
- sur `admin/carrieres/candidature_detail.html`, les champs "Poste recherché"
  et "Date de candidature" sont toujours vides et le badge affiche toujours
  "Candidature spontanée", même pour une candidature liée à une offre : le
  modèle Django `JobApplication` n'a ni champ `poste` ni `date_creation`
  (seulement `created_at`), donc ces variables de template ont toujours été
  silencieusement vides dans l'original.

Trois bugs d'auteur ont en revanche été corrigés car ils cassaient le rendu
au lieu de faire partie du design voulu :
- des balises ``` (Markdown) qui traînaient dans plusieurs templates Django
  et s'affichaient comme texte brut sur la page ;
- `background: url(...);` suivi d'une déclaration `center center/cover
  no-repeat;` orpheline (point-virgule en trop) sur 8 sections hero du site
  public, qui empêchait l'image de fond de bien couvrir la section ;
- le CSS admin et le CSS du site public n'étaient pas isolés (voir section
  précédente) : sans le scoping en trois niveaux, certains titres de
  sections admin héritaient par erreur du style "pastille bleue" du site
  public.
