/**
 * Données factices (mock).
 *
 * Ces tableaux/objets remplacent temporairement les données qui viendront
 * de l'API branchée sur PostgreSQL. Chaque export mime la forme des
 * modèles Django d'origine (JobOffer, Actualite, ...) pour que le
 * remplacement par de vrais appels API (fetch/axios) plus tard ne demande
 * que de changer la source de données, pas la forme des données ni les
 * composants qui les consomment.
 *
 * Les champs textuels destinés à l'affichage sont bilingues ({ fr, en } —
 * voir src/utils/i18nData.js::pickLang) pour suivre la langue active du site.
 */

export const offres = [
  {
    id: 1,
    titre: { fr: 'Responsable Commercial', en: 'Sales Manager' },
    ville: 'Lomé',
    type_contrat: { fr: 'CDI', en: 'Permanent contract' },
    departement: { fr: 'Direction Commerciale', en: 'Sales Department' },
    date_limite: '2026-09-30',
    created_at: '2026-07-01',
    actif: true,
    description: {
      fr:
        "ZENER recherche un(e) Responsable Commercial(e) pour piloter le développement " +
        "commercial de son réseau de stations-services et renforcer les relations avec " +
        "les partenaires stratégiques.",
      en:
        "ZENER is looking for a Sales Manager to drive the commercial development of its " +
        "network of service stations and strengthen relationships with strategic partners.",
    },
    missions: {
      fr:
        "Développer le portefeuille clients professionnels.\n" +
        "Négocier les accords de distribution avec les partenaires.\n" +
        "Suivre les objectifs commerciaux du réseau de stations.\n" +
        "Encadrer une équipe de commerciaux terrain.",
      en:
        "Grow the portfolio of business clients.\n" +
        "Negotiate distribution agreements with partners.\n" +
        "Track the sales targets of the station network.\n" +
        "Manage a team of field sales representatives.",
    },
    profil: {
      fr:
        "Bac+4/5 en commerce ou gestion.\n" +
        "5 ans d'expérience minimum dans une fonction commerciale similaire.\n" +
        "Excellent sens de la négociation et du relationnel.\n" +
        "Permis B indispensable.",
      en:
        "Master's degree in business or management.\n" +
        "At least 5 years of experience in a similar sales role.\n" +
        "Excellent negotiation and interpersonal skills.\n" +
        "Driving license required.",
    },
  },
  {
    id: 2,
    titre: { fr: 'Technicien Maintenance Stations', en: 'Station Maintenance Technician' },
    ville: 'Kara',
    type_contrat: { fr: 'CDD', en: 'Fixed-term contract' },
    departement: { fr: 'Exploitation', en: 'Operations' },
    date_limite: '2026-08-15',
    created_at: '2026-06-20',
    actif: true,
    description: {
      fr:
        "Sous la responsabilité du chef d'exploitation, vous assurez la maintenance " +
        "préventive et curative des équipements de nos stations-services de la région.",
      en:
        "Reporting to the operations manager, you will handle preventive and corrective " +
        "maintenance of equipment at our service stations in the region.",
    },
    missions: {
      fr:
        "Assurer l'entretien des pompes et cuves.\n" +
        "Diagnostiquer et réparer les pannes techniques.\n" +
        "Veiller au respect des normes de sécurité QHSE.",
      en:
        "Maintain pumps and tanks.\n" +
        "Diagnose and repair technical faults.\n" +
        "Ensure compliance with QHSE safety standards.",
    },
    profil: {
      fr:
        "Formation technique (BTS/DUT électromécanique ou équivalent).\n" +
        "2 ans d'expérience en maintenance industrielle.\n" +
        "Disponibilité pour des déplacements régionaux.",
      en:
        "Technical degree (electromechanical or equivalent).\n" +
        "2 years of experience in industrial maintenance.\n" +
        "Willingness to travel regionally.",
    },
  },
  {
    id: 3,
    titre: { fr: 'Chargé(e) de Clientèle ZenCard', en: 'ZenCard Customer Advisor' },
    ville: 'Lomé',
    type_contrat: { fr: 'Stage', en: 'Internship' },
    departement: { fr: 'Relation Client', en: 'Customer Relations' },
    date_limite: null,
    created_at: '2026-07-10',
    actif: true,
    description: {
      fr:
        "Rejoignez l'équipe ZenCard pour accompagner les particuliers et entreprises " +
        "dans leurs démarches d'adhésion et de suivi de leur carte de paiement carburant.",
      en:
        "Join the ZenCard team to support individuals and businesses with sign-up and " +
        "follow-up for their fuel payment card.",
    },
    missions: {
      fr:
        "Traiter les demandes d'adhésion ZenCard.\n" +
        "Répondre aux sollicitations clients par téléphone et email.\n" +
        "Participer à l'amélioration du parcours client.",
      en:
        "Process ZenCard sign-up requests.\n" +
        "Respond to customer requests by phone and email.\n" +
        "Contribute to improving the customer journey.",
    },
    profil: {
      fr:
        "Étudiant(e) en dernière année (commerce, communication).\n" +
        "Bon niveau rédactionnel et sens du service client.",
      en:
        "Final-year student (business, communication).\n" +
        "Good writing skills and customer-service mindset.",
    },
  },
];

export const actualites = [
  {
    id: 1,
    titre: { fr: 'ZENER renforce son réseau de stations-services', en: 'ZENER expands its network of service stations' },
    categorie: { fr: 'Entreprise', en: 'Company' },
    created_at: '2026-06-28',
    image: '/images/station-banner.png',
    contenu: {
      fr:
        "ZENER poursuit l'extension de son réseau national avec l'ouverture de nouvelles " +
        "stations-services, renforçant ainsi sa proximité avec les particuliers et les " +
        "entreprises sur l'ensemble du territoire togolais. Cette nouvelle phase " +
        "d'investissement s'inscrit dans la stratégie de développement durable du groupe.",
      en:
        "ZENER continues to expand its national network with the opening of new service " +
        "stations, strengthening its proximity to individuals and businesses across " +
        "Togo. This new investment phase is part of the group's sustainable development " +
        "strategy.",
    },
  },
  {
    id: 2,
    titre: { fr: 'Politique QHSE : notre engagement au quotidien', en: 'QHSE Policy: our daily commitment' },
    categorie: { fr: 'QHSE', en: 'QHSE' },
    created_at: '2026-05-28',
    image: '/images/qualite2.jpg',
    contenu: {
      fr:
        "Tous les jours, nous apportons de l'énergie au Togo et nous nous engageons à le " +
        "faire dans le respect le plus strict des normes de qualité, d'hygiène, de sécurité " +
        "et d'environnement. Notre politique QHSE guide chacune de nos actions.",
      en:
        "Every day, we bring energy to Togo, and we are committed to doing so in strict " +
        "compliance with quality, health, safety and environmental standards. Our QHSE " +
        "policy guides every one of our actions.",
    },
  },
  {
    id: 3,
    titre: { fr: 'ZenCard : déjà plus de 5000 utilisateurs satisfaits', en: 'ZenCard: already over 5,000 satisfied users' },
    categorie: { fr: 'ZenCard', en: 'ZenCard' },
    created_at: '2026-05-10',
    image: '/images/zencard_product.jpg',
    contenu: {
      fr:
        "La carte ZenCard poursuit son succès auprès des particuliers et des entreprises " +
        "togolaises, simplifiant chaque jour un peu plus la gestion des dépenses carburant " +
        "grâce à un paiement rapide et sécurisé dans tout le réseau ZENER.",
      en:
        "The ZenCard keeps growing in popularity among individuals and businesses in " +
        "Togo, making fuel expense management simpler every day thanks to fast, secure " +
        "payment across the entire ZENER network.",
    },
  },
];

// NOTE: id 4 (Evalu 50kg) utilise en attendant la photo de la bouteille bleue
// 12.5kg, faute d'une vraie photo Evalu 50kg fournie par le client — à remplacer.
export const boutiqueProducts = [
  { id: 1, name: 'Bouteille Multi Usage (25kg)', price: '67 250 FCFA', image: '/images/gaz/gaz.jpeg', category: 'gas' },
  { id: 2, name: 'Enora de 12.5Kg', price: '34 875 FCFA', image: '/images/gaz/enora-gaz-consigne-125kg.jpg', category: 'gas' },
  { id: 3, name: 'Enora de 6Kg', price: '19 750 FCFA', image: '/images/gaz/enora-6kg.jpg', category: 'gas' },
  {
    id: 4,
    name: 'Evalu (50kg)',
    price: '104 500 FCFA',
    oldPrice: '105 200 FCFA',
    discount: '-1%',
    image: '/images/gaz/sodigaz-12-kg-consigne.jpg',
    category: 'gas',
  },
  { id: 5, name: 'La petite butane (Sikavi 6kg)', price: '19 740 FCFA', image: '/images/gaz/sodigaz-recharge-b6.jpg', category: 'gas' },
];

export const testimonials = [
  {
    text: {
      fr:
        "Nous travaillons avec ZENER depuis plusieurs années pour l'approvisionnement de " +
        "notre flotte de véhicules. La qualité du service, la disponibilité des produits " +
        "et le professionnalisme des équipes répondent parfaitement à nos attentes.",
      en:
        "We have worked with ZENER for several years to supply our vehicle fleet. The " +
        "quality of service, product availability and professionalism of the teams " +
        "perfectly meet our expectations.",
    },
    name: 'KOMADAN Josué',
    role: { fr: 'CEO JOSUE THE DESIGNER', en: 'CEO JOSUE THE DESIGNER' },
    image: '/images/testimonial.jpg',
  },
  {
    text: {
      fr:
        "Le professionnalisme des équipes et la disponibilité des produits nous donnent " +
        "entière satisfaction.",
      en:
        "The professionalism of the teams and the availability of products give us " +
        "complete satisfaction.",
    },
    name: 'AKAKPO Mensah',
    role: { fr: 'DIRECTEUR GENERAL', en: 'CHIEF EXECUTIVE OFFICER' },
    image: '/images/testimonial2.png',
  },
  {
    text: {
      fr: "Un partenaire fiable qui accompagne efficacement notre développement.",
      en: "A reliable partner that effectively supports our growth.",
    },
    name: 'KOFFI Mawuli',
    role: { fr: 'RESPONSABLE OPERATIONS', en: 'OPERATIONS MANAGER' },
    image: '/images/testimonial3.png',
  },
];
