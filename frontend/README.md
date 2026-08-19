# ZENER — Frontend React

Portage en React (Vite) du site ZENER complet — site public et panneau
d'administration — avec un rendu visuel identique à l'original Django. Le
backend Django a été entièrement retiré du dépôt ; ce projet React est
maintenant la seule application. Les références à Django ci-dessous décrivent
l'origine du portage (templates et vues qui ont servi de source), pas un
service encore en place.

## Lancer le projet

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:5173`. Le panneau d'administration est
sur `/admin/login` (identifiants de démo : `admin` / `admin`, voir plus bas).

## Structure

```
src/
  pages/            site public : une page par route, chacune avec son CSS
                     extrait du <style> de la page Django d'origine
  components/        Navbar, Footer, Counter, TestimonialSlider (site public)
  styles/global.css  équivalent de static/css/style.css (styles partagés)
  data/mockData.js   données factices du site public (offres, actualités...)

  admin/
    AdminAuthContext.jsx   authentification factice (voir plus bas)
    AdminDataContext.jsx   store CRUD en mémoire pour l'admin (voir plus bas)
    AdminLayout.jsx/.css   sidebar + topbar, équivalent de admin/base.html
    RequireAdminAuth.jsx   garde de route (redirige vers /admin/login)
    pages/                 une page admin par route, même principe que
                            src/pages/ (CSS extrait + scopé)
  data/adminMockData.js    données factices de l'admin (candidatures,
                            messages, demandes ZenCard)
```

## Authentification admin (factice)

`src/admin/AdminAuthContext.jsx` simule la session Django (`login_required` +
`user.is_staff`) avec un état stocké en `localStorage`. Identifiants de démo :
`admin` / `admin` (n'importe quel couple non vide fonctionne aussi). Toutes
les routes `/admin-panel/...` sont protégées par `RequireAdminAuth`, qui
redirige vers `/admin/login` si non connecté — exactement le comportement de
`@login_required(login_url='admin_login')` côté Django.

**TODO** : remplacer par de vrais appels à l'API Django (session ou JWT) une
fois PostgreSQL branché.

## Données et actions CRUD (factices)

`src/admin/AdminDataContext.jsx` fournit un store en mémoire (state React,
non persisté) pour que le panneau d'administration soit utilisable de bout en
bout : créer/modifier/supprimer une offre, publier/supprimer une actualité,
valider/rejeter une demande ZenCard, marquer un message comme lu. Chaque
fonction est commentée `// TODO` à l'endroit exact où brancher le vrai appel
API PostgreSQL. Les données de départ viennent de `src/data/adminMockData.js`,
avec la même forme que les modèles Django (`JobApplication`, `ContactMessage`,
`DemandeZenCard`).

## Pourquoi chaque page a son propre fichier CSS scopé

Django charge le `<style>` de chaque template séparément à chaque requête (et
le panneau admin ne charge même jamais le CSS du site public), donc de
nombreuses pages — publiques et admin confondues — réutilisent les mêmes noms
de classe (`.container`, `.section-title`, `.page-header`, `.table-card`,
`.logo`...) avec des valeurs différentes sans jamais se marcher dessus. Dans
une SPA React, tous les CSS sont chargés ensemble en permanence : sans
précaution, le `.logo` de la sidebar admin aurait par exemple écrasé celui du
header du site public.

Trois niveaux de scoping garantissent qu'aucun CSS ne peut fuir d'une page ou
d'une section à l'autre :

1. **Isolation site public / admin** : `src/styles/global.css` (site public)
   est préfixé `.client-app`, `src/admin/AdminLayout.css` est préfixé
   `.admin-app`. `ClientLayout` et `AdminLayout` enveloppent leur contenu
   dans la div correspondante.
2. **Isolation entre pages du site public** : chaque `src/pages/X.css` est
   préfixé `.page-x` (le composant page enveloppe son contenu dans
   `<div className="page-x">`).
3. **Isolation entre pages admin** : même principe, chaque
   `src/admin/pages/X.css` est préfixé `.admin-page-x`.

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
