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
    ville: 'Lomé',
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

// Articles repris tels quels de zener.tg/actualites.
export const actualites = [
  {
    id: 1,
    titre: {
      fr: 'Groupe Zener : les 3 points clés de son premier Comité Exécutif',
      en: 'Zener Group: 3 key takeaways from its first Executive Committee',
    },
    categorie: { fr: 'Actualités', en: 'News' },
    created_at: '2026-08-10',
    image: '/images/zenertg/comite-executif.jpg',
    gallery: ['/images/zenertg/comite-executif-2.jpg', '/images/zenertg/comite-executif-3.jpg'],
    contenu: {
      fr:
        "Le Groupe Zener a tenu son tout premier Comité Exécutif, réunissant les Directeurs Généraux de ses " +
        "filiales et leurs collaborateurs clés. Cette première session a permis de faire le bilan du premier " +
        "semestre, de partager les avancées des projets stratégiques et d'aligner les priorités pour les mois à venir.\n" +
        "## Faire le bilan du premier semestre\n" +
        "Cette première session a permis de dresser un bilan des actions menées au cours du premier semestre et " +
        "de faire le point sur les avancées du Groupe.\n" +
        "## Suivre les projets stratégiques\n" +
        "Les participants ont partagé l'état d'avancement des projets stratégiques du Groupe, offrant un cadre " +
        "commun pour suivre les différentes initiatives et leurs prochaines étapes.\n" +
        "## Renforcer l'alignement entre les filiales\n" +
        "Au-delà du bilan, ce Comité Exécutif marque une étape dans le renforcement de la gouvernance du Groupe " +
        "Zener. Il traduit la volonté de favoriser une prise de décision concertée, de développer les synergies " +
        "entre les filiales et d'accélérer les projets qui créent de la valeur pour les clients, les partenaires " +
        "et les collaborateurs.\n" +
        "Appelé à devenir un rendez-vous régulier, le Comité Exécutif s'inscrit dans une ambition commune : " +
        "construire un Groupe plus agile, plus performant et résolument tourné vers l'avenir.",
      en:
        "The Zener Group held its very first Executive Committee, bringing together the Managing Directors of its " +
        "subsidiaries and their key staff. This first session reviewed the first half of the year, shared progress " +
        "on strategic projects and aligned priorities for the months ahead.\n" +
        "## Reviewing the first half of the year\n" +
        "This first session provided an overview of the actions carried out during the first half of the year and " +
        "an update on the Group's progress.\n" +
        "## Tracking strategic projects\n" +
        "Participants shared the status of the Group's strategic projects, providing a common framework to follow " +
        "the various initiatives and their next steps.\n" +
        "## Strengthening alignment between subsidiaries\n" +
        "Beyond the review, this Executive Committee marks a milestone in strengthening the governance of the Zener " +
        "Group. It reflects the will to encourage collective decision-making, develop synergies between subsidiaries " +
        "and accelerate the projects that create value for customers, partners and employees.\n" +
        "Set to become a regular meeting, the Executive Committee is part of a shared ambition: building a more " +
        "agile, higher-performing Group that is firmly focused on the future.",
    },
  },
  {
    id: 2,
    titre: {
      fr: "La ZenAttitude fait escale dans la ville aux 7 collines : Ouverture d'une oasis Zener à Atakpamé",
      en: 'The ZenAttitude stops in the city of 7 hills: a Zener Oasis opens in Atakpamé',
    },
    categorie: { fr: 'Actualités', en: 'News' },
    created_at: '2026-07-02',
    image: '/images/zenertg/oasis-atakpame.webp',
    gallery: ['/images/zenertg/oasis-atakpame-2.webp'],
    contenu: {
      fr:
        "Il y a des villes que l'on traverse. Et il y a celles où l'on choisit de faire une halte.\n" +
        "Avec ses collines, son dynamisme et sa position stratégique, Atakpamé, affectueusement surnommée la ville " +
        "aux 7 collines, est de celles qui relient les hommes, les régions et les histoires.\n" +
        "Aujourd'hui, un nouveau chapitre s'écrit avec l'ouverture de la 11ᵉ Oasis Zener, qui vient renforcer notre " +
        "réseau et rapprocher encore davantage nos services de nos clients.\n" +
        "## Une Oasis, bien plus qu'une station-service\n" +
        "À Atakpamé, cette nouvelle Oasis ne sera pas seulement une station-service où faire le plein. Les usagers " +
        "y retrouveront tout ce qui fait l'expérience Zener : les carburants Xtraline et Xtrazole, ainsi que la " +
        "Zencard, la carte carburant de Zener qui simplifie le paiement et permet d'accéder au self-service 24 h/24, " +
        "etc. Une manière de rendre chaque trajet plus simple, plus rapide et plus serein.\n" +
        "## Une nouvelle étape sur les routes du Togo\n" +
        "Avec cette 11ᵉ Oasis, Zener poursuit le développement de son réseau de stations-service au service de la " +
        "mobilité togolaise. Déjà présente à Lomé, Aného, Kara, Blitta, Tsévié et Kpalimé, la famille des Oasis " +
        "Zener s'agrandit aujourd'hui avec l'ambition de rapprocher ses solutions de ses clients, partout où ils " +
        "ont besoin.\n" +
        "À Atakpamé, la ZenAttitude fait désormais escale. Et comme toute Oasis qui grandit, celle-ci n'est qu'une " +
        "nouvelle étape.\n" +
        "Petit à petit, l'Oasis fait son nid.",
      en:
        "There are cities you pass through. And there are those where you choose to stop.\n" +
        "With its hills, its energy and its strategic location, Atakpamé, affectionately known as the city of 7 " +
        "hills, is one of those places that connect people, regions and stories.\n" +
        "Today, a new chapter begins with the opening of the 11th Zener Oasis, which strengthens our network and " +
        "brings our services even closer to our customers.\n" +
        "## An Oasis, much more than a service station\n" +
        "In Atakpamé, this new Oasis will not just be a service station to fill up. Customers will find everything " +
        "that makes the Zener experience: Xtraline and Xtrazole fuels, as well as the Zencard, Zener's fuel card " +
        "that simplifies payment and gives access to 24/7 self-service, and more. A way to make every journey " +
        "simpler, faster and more relaxed.\n" +
        "## A new milestone on Togo's roads\n" +
        "With this 11th Oasis, Zener continues to develop its network of service stations serving mobility in " +
        "Togo. Already present in Lomé, Aného, Kara, Blitta, Tsévié and Kpalimé, the Zener Oasis family is " +
        "growing today, with the ambition of bringing its solutions closer to its customers, wherever they need them.\n" +
        "In Atakpamé, the ZenAttitude now makes a stop. And like every growing Oasis, this is just one more step.\n" +
        "Little by little, the Oasis builds its nest.",
    },
  },
];

// Catalogue repris de zener.tg/produits : références, prix, descriptions et
// rattachements (type, marque, métier) identiques aux filtres du site
// d'origine — les 8 produits sont tous de type « gaz » et du métier
// « gaz-energie », aucun n'est rattaché à un public. `slug` reprend l'URL
// zener.tg (/produits/<slug>). Apefa 3 kg n'a pas encore de visuel sur
// zener.tg : visuel générique gaz en attendant.
export const boutiqueProducts = [
  {
    id: 1,
    slug: 'la-petite-butane-sikavi-6kg',
    name: 'La petite butane (Sikavi 6kg)',
    brand: 'sodigaz',
    type: 'gaz',
    metier: 'gaz-energie',
    publics: [],
    price: '19 740 FCFA',
    image: '/images/zenertg/sikavi-6kg.jpeg',
    category: 'gas',
    description: {
      fr: 'Bouteille Sikavi 6kg Petite Butane, idéale pour un usage domestique, sécurisée et facile à recharger grâce au système de consigne.',
      en: 'Sikavi 6kg "Petite Butane" cylinder, ideal for household use, safe and easy to refill thanks to the deposit system.',
    },
  },
  {
    id: 2,
    slug: 'evalu-50kg',
    name: 'Evalu (50kg)',
    brand: 'sodigaz',
    type: 'gaz',
    metier: 'gaz-energie',
    publics: [],
    price: '104 500 FCFA',
    image: '/images/zenertg/evalu-50kg.jpeg',
    category: 'gas',
    description: {
      fr: 'Bouteille Evalu 50kg, grand format pour particuliers et professionnels, offrant une autonomie maximale et sécurisée.',
      en: 'Evalu 50kg cylinder, a large format for households and professionals, offering maximum and safe autonomy.',
    },
  },
  {
    id: 3,
    slug: 'enora-de-6kg',
    name: 'Enora de 6Kg',
    brand: 'enora',
    type: 'gaz',
    metier: 'gaz-energie',
    publics: [],
    price: '19 750 FCFA',
    image: '/images/zenertg/enora-6kg.jpeg',
    category: 'gas',
    description: {
      fr: 'Bouteille Enora 6kg, polyvalente et pratique, idéale pour un usage domestique ou en extérieur, sûre et facile à recharger.',
      en: 'Enora 6kg cylinder, versatile and practical, ideal for household or outdoor use, safe and easy to refill.',
    },
  },
  {
    id: 4,
    slug: 'enora-de-125kg',
    name: 'Enora de 12.5Kg',
    brand: 'enora',
    type: 'gaz',
    metier: 'gaz-energie',
    publics: [],
    price: '34 875 FCFA',
    image: '/images/zenertg/enora-12-5kg.jpeg',
    category: 'gas',
    description: {
      fr: 'Bouteille Enora 12,5kg, économique et polyvalente, idéale pour un usage domestique ou professionnel, résistante et facile à raccorder.',
      en: 'Enora 12.5kg cylinder, economical and versatile, ideal for household or professional use, sturdy and easy to connect.',
    },
  },
  {
    id: 5,
    slug: 'abire',
    name: 'Abiré (12.5 kg)',
    brand: 'sodigaz',
    type: 'gaz',
    metier: 'gaz-energie',
    publics: [],
    price: '34 875 FCFA',
    image: '/images/zenertg/abire-12-5kg.jpeg',
    category: 'gas',
    description: {
      fr: 'Bouteille Abiré 12,5kg, adaptée aux foyers nombreux ou aux usages professionnels légers, sécurisée et facile à recharger grâce au système de consigne',
      en: 'Abiré 12.5kg cylinder, suited to large households or light professional use, safe and easy to refill thanks to the deposit system.',
    },
  },
  {
    id: 6,
    slug: 'aboe-nomou-6kg-robinet',
    name: 'Aboe Nomou (6kg robinet)',
    brand: 'sodigaz',
    type: 'gaz',
    metier: 'gaz-energie',
    publics: [],
    price: '19 740 FCFA',
    image: '/images/zenertg/aboe-nomou-6kg.jpeg',
    category: 'gas',
    description: {
      fr: 'Bouteille Aboe Nomou 6kg pour robinet, pratique et sécurisée pour un usage domestique ou professionnel léger, avec rechargement économique via le système de consigne.',
      en: 'Aboe Nomou 6kg valve cylinder, practical and safe for household or light professional use, with economical refills through the deposit system.',
    },
  },
  {
    id: 7,
    slug: 'apefa-3-kg',
    name: 'Apefa 3 kg',
    brand: 'sodigaz',
    type: 'gaz',
    metier: 'gaz-energie',
    publics: [],
    price: '10 350 FCFA',
    image: '/images/gaz/gaz.jpeg',
    category: 'gas',
    description: {
      fr: 'Apefa 3 kg est une recharge de gaz pratique et sécurisée, idéale pour vos besoins domestiques. Elle assure une cuisson efficace et fiable, parfaite pour le foyer.',
      en: 'Apefa 3 kg is a practical and safe gas refill, ideal for your household needs. It ensures efficient and reliable cooking, perfect for the home.',
    },
  },
  {
    id: 8,
    slug: 'bouteille-multi-usage25kg',
    name: 'Bouteille Multi Usage (25kg)',
    brand: 'sodigaz',
    type: 'gaz',
    metier: 'gaz-energie',
    publics: [],
    price: '67 250 FCFA',
    image: '/images/zenertg/multi-usage-25kg.jpeg',
    category: 'gas',
    description: {
      fr: 'Bouteille Multi Usage 25kg, adaptée aux particuliers et entreprises, simple à installer et sécurisée pour un usage quotidien.',
      en: 'Multi Usage 25kg cylinder, suited to households and businesses, simple to install and safe for everyday use.',
    },
  },
];

// Options des filtres du catalogue, dans l'ordre et avec les valeurs d'URL
// de zener.tg/produits.
export const catalogFilters = {
  type: ['carburants', 'gaz', 'lubrifiants', 'produits-automobiles', 'energie', 'equipements', 'offres-professionnelles', 'autres'],
  marque: ['oasis', 'sodigaz', 'enora', 'zencard'],
  metier: ['distribution-de-carburants', 'gaz-energie', 'mobilite-services', 'lubrifiants', 'solutions-b2b'],
  public: ['particuliers', 'entreprises-pme', 'industriels', 'horeca', 'transport-flotte', 'institutions-partenaires'],
};

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
