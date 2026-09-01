/**
 * Données des stations/sites ZENER Bénin.
 *
 * Une seule adresse connue à ce jour : le siège de Zener Bénin SA à
 * Cotonou (fourni par le client). Pas encore de réseau de stations à
 * afficher — à compléter dès que la liste sera disponible, sur le même
 * modèle que ce qui avait été fait pour le Togo (nom, ville, adresse,
 * téléphone, coordonnées lat/lng).
 *
 * Coordonnées : centre-ville de Cotonou (OpenStreetMap) — le quartier
 * Gbenan précis n'a pas de repère sur OpenStreetMap, à affiner avec un
 * pointage GPS du client si possible.
 */

export const stations = [
  {
    id: 1,
    name: 'Zener Bénin — Siège',
    image: '/images/station-banner.png', // placeholder — photo réelle à fournir
    city: 'Cotonou',
    address:
      "Carré 426, Quartier Gbenan, en face de l'Église Évangélique Source de Vie, " +
      "7ème arrondissement de Cotonou (non loin de l'Église Saint Michel de Cotonou)",
    phone: '01 92 35 00 00',
    description: {
      fr: 'Siège de Zener Bénin SA, à Cotonou.',
      en: 'Zener Bénin SA head office, in Cotonou.',
    },
    lat: 6.3677, // Cotonou (OpenStreetMap, échelle ville) — à affiner
    lng: 2.4253,
    services: {
      fr: 'Carburants, gaz, lubrifiants, services de proximité.',
      en: 'Fuel, gas, lubricants, neighborhood services.',
    },
  },
];
