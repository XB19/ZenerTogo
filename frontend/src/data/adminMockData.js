/**
 * Données factices (mock) pour le panneau d'administration.
 *
 * Comme pour src/data/mockData.js côté site public : ces tableaux imitent la
 * forme des modèles Django (ContactMessage, JobApplication, DemandeZenCard)
 * pour que brancher une vraie API PostgreSQL plus tard ne demande que de
 * remplacer la source de données. Les actions (créer/modifier/supprimer/
 * valider) sont simulées en mémoire (state React) et marquées `// TODO`.
 */
import { offres as jobOffers, actualites as newsItems } from './mockData.js';

// Ré-exportées telles quelles : mêmes données que le site public, ce sont
// aussi les modèles gérés depuis l'admin (JobOffer, Actualite).
export const offres = jobOffers;
export const actualites = newsItems;

export const candidatures = [
  {
    id: 1,
    offre: offres[0],
    nom: 'Akouvi Mensah',
    email: 'akouvi.mensah@example.com',
    telephone: '+228 90 11 22 33',
    message:
      "Forte de 6 ans d'expérience en développement commercial dans le secteur " +
      "énergétique, je suis très motivée à rejoindre ZENER pour contribuer à " +
      "l'expansion de son réseau.",
    cv: '/media/candidatures/cv/exemple-cv.pdf',
    lettre_motivation: '/media/candidatures/lettres/exemple-lettre.pdf',
    created_at: '2026-07-15T09:30:00',
    traitee: false,
  },
  {
    id: 2,
    offre: offres[1],
    nom: 'Komi Adjovi',
    email: 'komi.adjovi@example.com',
    telephone: '+228 91 22 33 44',
    message: 'Technicien diplômé, disponible immédiatement.',
    cv: '/media/candidatures/cv/exemple-cv.pdf',
    lettre_motivation: null,
    created_at: '2026-07-10T14:00:00',
    traitee: true,
  },
  {
    id: 3,
    offre: null,
    nom: 'Yawa Dogbe',
    email: 'yawa.dogbe@example.com',
    telephone: '+228 92 33 44 55',
    message: "Candidature spontanée : étudiante en communication à la recherche d'un stage.",
    cv: '/media/candidatures/cv/exemple-cv.pdf',
    lettre_motivation: '/media/candidatures/lettres/exemple-lettre.pdf',
    created_at: '2026-07-05T11:15:00',
    traitee: false,
  },
];

export const contactMessages = [
  {
    id: 1,
    nom: 'Sena Kokou',
    email: 'sena.kokou@example.com',
    telephone: '+228 93 44 55 66',
    sujet: 'Demande de partenariat',
    message:
      "Bonjour, je représente une entreprise de logistique et je souhaiterais " +
      "échanger sur un partenariat pour l'approvisionnement de notre flotte.",
    lu: false,
    created_at: '2026-07-16T08:20:00',
  },
  {
    id: 2,
    nom: 'Ama Tossou',
    email: 'ama.tossou@example.com',
    telephone: '+228 94 55 66 77',
    sujet: 'Question sur la ZenCard',
    message: "Je souhaiterais savoir comment recharger ma ZenCard en ligne.",
    lu: true,
    created_at: '2026-07-12T16:45:00',
  },
  {
    id: 3,
    nom: 'Kodjo Amenyo',
    email: 'kodjo.amenyo@example.com',
    telephone: '',
    sujet: 'Réclamation station Aného',
    message: "La station d'Aného était fermée hier alors que les horaires indiquaient 8h-17h.",
    lu: false,
    created_at: '2026-07-08T13:10:00',
  },
];

export const zencardDemandes = [
  {
    id: 1,
    nom: 'Efoe Agbeko',
    telephone: '+228 95 66 77 88',
    email: 'efoe.agbeko@example.com',
    ville: 'Lomé',
    type_demande: 'Particulier',
    station_retrait: 'Zener Hedzranawoe',
    cni: '/media/zencard/cni/exemple-cni.jpg',
    date_creation: '2026-07-14T10:00:00',
    statut: 'en_attente',
  },
  {
    id: 2,
    nom: 'Sarl Togo Transport',
    telephone: '+228 96 77 88 99',
    email: 'contact@togotransport.example.com',
    ville: 'Kara',
    type_demande: 'Entreprise',
    station_retrait: 'Zener Kara',
    cni: '/media/zencard/cni/exemple-cni.jpg',
    date_creation: '2026-07-09T15:30:00',
    statut: 'validee',
  },
  {
    id: 3,
    nom: 'Nadia Bakoubatevi',
    telephone: '+228 97 88 99 00',
    email: 'nadia.b@example.com',
    ville: 'Sokodé',
    type_demande: 'Particulier',
    station_retrait: 'Zener Sokode',
    cni: '/media/zencard/cni/exemple-cni.jpg',
    date_creation: '2026-07-01T09:00:00',
    statut: 'rejetee',
  },
];
