/**
 * Données des stations ZENER (réseau Oasis).
 *
 * Noms, adresses et numéros fournis par le client. Les coordonnées lat/lng
 * ont été géocodées via OpenStreetMap/Nominatim à partir du repère indiqué
 * dans l'adresse (ex : "Carrefour 2 Lions", "Marché d'Adéwui", centre-ville
 * de Tsévié/Kpalimé/Atakpamé/Blitta/Kara...). Pour Agoè Télessou et Ramatou
 * (zone industrielle), aucun repère exact n'existe sur OpenStreetMap : la
 * position utilise le quartier/la zone la plus proche identifiée — à
 * affiner avec un pointage GPS précis du client si possible. `image`
 * pointe vers un visuel générique du site en attendant une vraie photo par
 * station — à remplacer.
 */

export const stations = [
  {
    id: 1,
    name: 'Oasis Agoè',
    image: '/images/station1.png', // placeholder — photo réelle à fournir
    city: 'Lomé',
    address: 'Carrefour 2 Lions, à côté de la Pharmacie Notre Dame de Lourdes',
    phone: '+228 91 12 11 71',
    description: {
      fr: 'Station de référence proposant carburants, gaz et services de proximité.',
      en: 'Flagship station offering fuel, gas and neighborhood services.',
    },
    lat: 6.21766, // Carrefour Deux Lions (OpenStreetMap)
    lng: 1.18852,
    services: {
      fr: 'Carburants, gaz, services de proximité, paiements ZenCard.',
      en: 'Fuel, gas, neighborhood services, ZenCard payments.',
    },
  },
  {
    id: 2,
    name: 'Oasis Agoè Télessou',
    image: '/images/station.png', // placeholder — photo réelle à fournir
    city: 'Lomé',
    address: "Agoè Téléssou, non loin de la poste de l'entreprise l'Union",
    phone: '+228 79 34 31 68',
    description: {
      fr: 'Station de proximité au cœur du quartier Agoè Téléssou.',
      en: 'Neighborhood station in the heart of the Agoè Téléssou district.',
    },
    lat: 6.2243, // quartier Agoè-Nyivé (OpenStreetMap) — à affiner
    lng: 1.2102, // quartier Agoè-Nyivé (OpenStreetMap) — à affiner
    services: {
      fr: 'Carburants, gaz, services de proximité, paiements ZenCard.',
      en: 'Fuel, gas, neighborhood services, ZenCard payments.',
    },
  },
  {
    id: 3,
    name: 'Oasis Nyékonakpoé',
    image: '/images/station.png', // placeholder — photo réelle à fournir
    city: 'Lomé',
    address: "Nyékonakpoè adjololo, lycée français en face de l'agence Togocel",
    phone: '+228 79 34 31 66',
    description: {
      fr: 'Station de proximité offrant un accueil client et des services énergétiques.',
      en: 'Neighborhood station offering customer service and energy services.',
    },
    lat: 6.1302, // Nyékonakpoé (OpenStreetMap)
    lng: 1.2059,
    services: {
      fr: 'Services énergétiques et accueil client.',
      en: 'Energy services and customer service.',
    },
  },
  {
    id: 4,
    name: 'Oasis Ramatou',
    image: '/images/station-banner.png', // placeholder — photo réelle à fournir
    city: 'Lomé',
    address: 'Zone industrielle, rond-point Katanga',
    phone: '+228 79 34 31 67',
    description: {
      fr: 'Station implantée en zone industrielle, au service des professionnels et des particuliers.',
      en: 'Station located in the industrial zone, serving businesses and individuals alike.',
    },
    lat: 6.14, // zone portuaire/industrielle de Lomé (OpenStreetMap) — à affiner
    lng: 1.28, // zone portuaire/industrielle de Lomé (OpenStreetMap) — à affiner
    services: {
      fr: 'Carburants, gaz, services de proximité, paiements ZenCard.',
      en: 'Fuel, gas, neighborhood services, ZenCard payments.',
    },
  },
  {
    id: 5,
    name: 'Oasis TAM-TAM',
    image: '/images/station1.png', // placeholder — photo réelle à fournir
    city: 'Lomé',
    address: 'Adewi, en face de la pharmacie Saint Kisito',
    phone: '+228 79 34 31 69',
    description: {
      fr: "Station de quartier desservant le secteur d'Adéwi.",
      en: 'Neighborhood station serving the Adéwi area.',
    },
    lat: 6.16, // Marché d'Adéwui, Doumasséssé (OpenStreetMap)
    lng: 1.2126,
    services: {
      fr: 'Carburants, gaz, services de proximité, paiements ZenCard.',
      en: 'Fuel, gas, neighborhood services, ZenCard payments.',
    },
  },
  {
    id: 6,
    name: 'Oasis Aného',
    image: '/images/station-banner.png', // placeholder — photo réelle à fournir
    city: 'Aného',
    address: 'Aného Kpota, en face du corner qui mène au Miadjoe Beach Resort',
    phone: '+228 79 34 31 72',
    description: {
      fr: 'Distribution de carburants et services associés sur la côte togolaise.',
      en: 'Fuel distribution and related services on the Togolese coast.',
    },
    lat: 6.2289, // Aného (OpenStreetMap)
    lng: 1.5938,
    services: {
      fr: 'Distribution de carburants et services.',
      en: 'Fuel distribution and services.',
    },
  },
  {
    id: 7,
    name: 'Oasis Tsévié',
    image: '/images/station.png', // placeholder — photo réelle à fournir
    city: 'Tsévié',
    address: 'À gauche, non loin du pesage de Tsévié',
    phone: '+228 79 34 31 70',
    description: {
      fr: 'Station sur l\'axe Lomé–Tsévié, au service des voyageurs et des riverains.',
      en: 'Station on the Lomé–Tsévié road, serving travelers and local residents.',
    },
    lat: 6.4231, // Tsévié (OpenStreetMap)
    lng: 1.2105,
    services: {
      fr: 'Carburants, gaz, services de proximité, paiements ZenCard.',
      en: 'Fuel, gas, neighborhood services, ZenCard payments.',
    },
  },
  {
    id: 8,
    name: 'Oasis Kpalimé',
    image: '/images/station1.png', // placeholder — photo réelle à fournir
    city: 'Kpalimé',
    address: "Kpalimé-Kpeta, non loin de l'hôtel 30 Août en entrant dans la ville de Kpalimé",
    phone: '+228 92 03 44 44',
    description: {
      fr: 'Produits pétroliers et services associés dans la région des Plateaux.',
      en: 'Petroleum products and related services in the Plateaux region.',
    },
    lat: 6.9107, // Kpalimé (OpenStreetMap)
    lng: 0.6324,
    services: {
      fr: 'Produits pétroliers et services associés.',
      en: 'Petroleum products and related services.',
    },
  },
  {
    id: 9,
    name: 'Oasis Atakpamé',
    image: '/images/station.png', // placeholder — photo réelle à fournir
    city: 'Atakpamé',
    address: 'Avédjè, non loin de la direction de la SOTOCO (200m)',
    phone: '+228 79 34 31 74',
    description: {
      fr: 'Station desservant la ville d\'Atakpamé et ses environs.',
      en: 'Station serving the town of Atakpamé and its surroundings.',
    },
    lat: 7.5321, // Atakpamé (OpenStreetMap)
    lng: 1.1219,
    services: {
      fr: 'Carburants, gaz, services de proximité, paiements ZenCard.',
      en: 'Fuel, gas, neighborhood services, ZenCard payments.',
    },
  },
  {
    id: 10,
    name: 'Oasis Blitta',
    image: '/images/station1.png', // placeholder — photo réelle à fournir
    city: 'Blitta',
    address: "En face de l'usine Diwa Industries",
    phone: '+228 79 34 31 73',
    description: {
      fr: "Station de proximité sur l'axe routier national, à Blitta.",
      en: 'Neighborhood station on the national highway, in Blitta.',
    },
    lat: 8.3535, // Blitta (OpenStreetMap)
    lng: 0.9963,
    services: {
      fr: 'Carburants, gaz, services de proximité, paiements ZenCard.',
      en: 'Fuel, gas, neighborhood services, ZenCard payments.',
    },
  },
  {
    id: 11,
    name: 'Oasis Kara',
    image: '/images/station-banner.png', // placeholder — photo réelle à fournir
    city: 'Kara',
    address: 'Carrefour Lama',
    phone: '+228 79 34 31 71',
    description: {
      fr: 'Station de référence desservant la région de la Kara.',
      en: 'Flagship station serving the Kara region.',
    },
    lat: 9.5489, // Kara (OpenStreetMap)
    lng: 1.1977,
    services: {
      fr: 'Carburants, gaz, services de proximité, paiements ZenCard.',
      en: 'Fuel, gas, neighborhood services, ZenCard payments.',
    },
  },
];
