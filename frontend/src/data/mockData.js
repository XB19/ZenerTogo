/**
 * Données factices (mock).
 *
 * Ces tableaux/objets remplacent temporairement les données qui viendront
 * de l'API branchée sur PostgreSQL. Chaque export mime la forme des
 * modèles Django d'origine (JobOffer, Actualite, ...) pour que le
 * remplacement par de vrais appels API (fetch/axios) plus tard ne demande
 * que de changer la source de données, pas la forme des données ni les
 * composants qui les consomment.
 */

export const offres = [
  {
    id: 1,
    titre: 'Responsable Commercial',
    ville: 'Lomé',
    type_contrat: 'CDI',
    departement: 'Direction Commerciale',
    date_limite: '2026-09-30',
    created_at: '2026-07-01',
    actif: true,
    description:
      "ZENER recherche un(e) Responsable Commercial(e) pour piloter le développement " +
      "commercial de son réseau de stations-services et renforcer les relations avec " +
      "les partenaires stratégiques.",
    missions:
      "Développer le portefeuille clients professionnels.\n" +
      "Négocier les accords de distribution avec les partenaires.\n" +
      "Suivre les objectifs commerciaux du réseau de stations.\n" +
      "Encadrer une équipe de commerciaux terrain.",
    profil:
      "Bac+4/5 en commerce ou gestion.\n" +
      "5 ans d'expérience minimum dans une fonction commerciale similaire.\n" +
      "Excellent sens de la négociation et du relationnel.\n" +
      "Permis B indispensable.",
  },
  {
    id: 2,
    titre: 'Technicien Maintenance Stations',
    ville: 'Kara',
    type_contrat: 'CDD',
    departement: 'Exploitation',
    date_limite: '2026-08-15',
    created_at: '2026-06-20',
    actif: true,
    description:
      "Sous la responsabilité du chef d'exploitation, vous assurez la maintenance " +
      "préventive et curative des équipements de nos stations-services de la région.",
    missions:
      "Assurer l'entretien des pompes et cuves.\n" +
      "Diagnostiquer et réparer les pannes techniques.\n" +
      "Veiller au respect des normes de sécurité QHSE.",
    profil:
      "Formation technique (BTS/DUT électromécanique ou équivalent).\n" +
      "2 ans d'expérience en maintenance industrielle.\n" +
      "Disponibilité pour des déplacements régionaux.",
  },
  {
    id: 3,
    titre: 'Chargé(e) de Clientèle ZenCard',
    ville: 'Lomé',
    type_contrat: 'Stage',
    departement: 'Relation Client',
    date_limite: null,
    created_at: '2026-07-10',
    actif: true,
    description:
      "Rejoignez l'équipe ZenCard pour accompagner les particuliers et entreprises " +
      "dans leurs démarches d'adhésion et de suivi de leur carte de paiement carburant.",
    missions:
      "Traiter les demandes d'adhésion ZenCard.\n" +
      "Répondre aux sollicitations clients par téléphone et email.\n" +
      "Participer à l'amélioration du parcours client.",
    profil:
      "Étudiant(e) en dernière année (commerce, communication).\n" +
      "Bon niveau rédactionnel et sens du service client.",
  },
];

export const actualites = [
  {
    id: 1,
    titre: 'ZENER renforce son réseau de stations-services',
    categorie: 'Entreprise',
    created_at: '2026-06-28',
    image: '/images/station-banner.png',
    contenu:
      "ZENER poursuit l'extension de son réseau national avec l'ouverture de nouvelles " +
      "stations-services, renforçant ainsi sa proximité avec les particuliers et les " +
      "entreprises sur l'ensemble du territoire togolais. Cette nouvelle phase " +
      "d'investissement s'inscrit dans la stratégie de développement durable du groupe.",
  },
  {
    id: 2,
    titre: 'Politique QHSE : notre engagement au quotidien',
    categorie: 'QHSE',
    created_at: '2026-05-28',
    image: '/images/qualite2.jpg',
    contenu:
      "Tous les jours, nous apportons de l'énergie au Togo et nous nous engageons à le " +
      "faire dans le respect le plus strict des normes de qualité, d'hygiène, de sécurité " +
      "et d'environnement. Notre politique QHSE guide chacune de nos actions.",
  },
  {
    id: 3,
    titre: 'ZenCard : déjà plus de 5000 utilisateurs satisfaits',
    categorie: 'ZenCard',
    created_at: '2026-05-10',
    image: '/images/zencard_product.jpg',
    contenu:
      "La carte ZenCard poursuit son succès auprès des particuliers et des entreprises " +
      "togolaises, simplifiant chaque jour un peu plus la gestion des dépenses carburant " +
      "grâce à un paiement rapide et sécurisé dans tout le réseau ZENER.",
  },
];

export const stations = [
  {
    id: 1,
    name: 'Oasis Agoè 2 Lions',
    city: 'Lomé',
    lat: 6.22,
    lng: 1.17,
    services: 'Carburants, gaz, services de proximité, paiements ZenCard.',
  },
  {
    id: 2,
    name: 'Oasis Nyékonakpoè',
    city: 'Lomé',
    lat: 6.128,
    lng: 1.225,
    services: 'Services énergétiques et accueil client.',
  },
  {
    id: 3,
    name: 'Oasis Aného',
    city: 'Aného',
    lat: 6.227,
    lng: 1.59,
    services: 'Distribution de carburants et services.',
  },
  {
    id: 4,
    name: 'Oasis Kpalimé',
    city: 'Kpalimé',
    lat: 6.9,
    lng: 0.632,
    services: 'Produits pétroliers et services associés.',
  },
];

export const shopProducts = [
  { id: 1, name: 'Abrié (12.5 kg)', price: '34 875 CFA', image: '/images/gaz.jpeg' },
  { id: 2, name: 'Abrié (12.5 kg)', price: '34 875 CFA', image: '/images/gaz.jpeg' },
  { id: 3, name: 'Abrié (12.5 kg)', price: '34 875 CFA', image: '/images/gaz.jpeg' },
  { id: 4, name: 'Abrié (12.5 kg)', price: '34 875 CFA', image: '/images/gaz.jpeg' },
  { id: 5, name: 'Abrié (12.5 kg)', price: '34 875 CFA', image: '/images/gaz.jpeg' },
];

export const boutiqueProducts = [
  { id: 1, name: 'Lubrifiant Premium', price: '34 875 FCFA', image: '/images/card1.jpg' },
  { id: 2, name: 'Huile moteur', price: '34 875 FCFA', image: '/images/card2.jpg' },
  { id: 3, name: 'Accessoire Auto', price: '34 875 FCFA', image: '/images/card3.jpg' },
  { id: 4, name: 'Produit ZENER', price: '34 875 FCFA', image: '/images/card4.jpg' },
];

export const testimonials = [
  {
    text:
      "Nous travaillons avec ZENER depuis plusieurs années pour l'approvisionnement de " +
      "notre flotte de véhicules. La qualité du service, la disponibilité des produits " +
      "et le professionnalisme des équipes répondent parfaitement à nos attentes.",
    name: 'KOMADAN Josué',
    role: 'CEO JOSUE THE DESIGNER',
    image: '/images/testimonial.jpg',
  },
  {
    text:
      "Le professionnalisme des équipes et la disponibilité des produits nous donnent " +
      "entière satisfaction.",
    name: 'AKAKPO Mensah',
    role: 'DIRECTEUR GENERAL',
    image: '/images/testimonial2.png',
  },
  {
    text: "Un partenaire fiable qui accompagne efficacement notre développement.",
    name: 'KOFFI Mawuli',
    role: 'RESPONSABLE OPERATIONS',
    image: '/images/testimonial3.png',
  },
];
