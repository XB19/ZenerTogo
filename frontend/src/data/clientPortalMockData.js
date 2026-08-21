/**
 * Données factices du Portail Client.
 *
 * TODO: remplacer par de vrais appels API (compte client authentifié) une
 * fois le backend branché. La forme de chaque objet est pensée pour rester
 * stable quand la vraie API arrivera.
 */

export const customerProfile = {
  id: 1,
  nom: 'Komadan',
  prenom: 'Josué',
  email: 'josue.komadan@example.com',
  telephone: '+228 90 12 34 56',
  ville: 'Lomé',
  adresse: 'Quartier Adidogomé, Lomé',
  dateInscription: '2024-03-12',
};

export const myZencards = [
  {
    id: 1,
    numero: 'ZC-2024-001834',
    type: 'Particulier',
    statut: 'active',
    solde: 45000,
    dateActivation: '2024-03-15',
    stationPreferee: 'Oasis Agoè 2 Lions',
  },
  {
    id: 2,
    numero: 'ZC-2025-004421',
    type: 'Entreprise',
    statut: 'active',
    solde: 128500,
    dateActivation: '2025-01-08',
    stationPreferee: 'Oasis Nyékonakpoè',
  },
];

export const myTransactions = [
  { id: 1, date: '2026-08-14T09:20:00', zencardNumero: 'ZC-2024-001834', station: 'Oasis Agoè 2 Lions', type: 'Achat carburant', montant: -15000, statut: 'validee' },
  { id: 2, date: '2026-08-10T17:05:00', zencardNumero: 'ZC-2024-001834', station: 'Recharge en ligne', type: 'Recharge', montant: 25000, statut: 'validee' },
  { id: 3, date: '2026-08-02T12:40:00', zencardNumero: 'ZC-2025-004421', station: 'Oasis Nyékonakpoè', type: 'Achat carburant', montant: -32000, statut: 'validee' },
  { id: 4, date: '2026-07-27T08:15:00', zencardNumero: 'ZC-2024-001834', station: 'Oasis Aného', type: 'Achat gaz', montant: -9500, statut: 'validee' },
  { id: 5, date: '2026-07-20T14:50:00', zencardNumero: 'ZC-2025-004421', station: 'Recharge en ligne', type: 'Recharge', montant: 50000, statut: 'en_attente' },
];

export const myReclamations = [
  {
    id: 1,
    numero: 'REC-2026-0142',
    sujet: 'Débit incorrect sur ma ZenCard',
    categorie: 'Facturation',
    description:
      "J'ai constaté un débit de 15 000 FCFA le 14 août alors que mon plein " +
      "n'a coûté que 12 000 FCFA à la station Oasis Agoè 2 Lions.",
    statut: 'en_cours',
    priorite: 'normale',
    dateCreation: '2026-08-15T10:12:00',
    dateMaj: '2026-08-16T09:00:00',
    historique: [
      { date: '2026-08-15T10:12:00', auteur: 'Vous', message: 'Réclamation créée.' },
      { date: '2026-08-15T15:30:00', auteur: 'Service Client', message: 'Réclamation prise en charge, vérification en cours auprès de la station.' },
      { date: '2026-08-16T09:00:00', auteur: 'Service Client', message: 'Nous avons contacté la station, réponse attendue sous 48h.' },
    ],
  },
  {
    id: 2,
    numero: 'REC-2026-0098',
    sujet: 'ZenCard non reconnue à la borne',
    categorie: 'Technique',
    description: 'Ma carte ZenCard entreprise est refusée depuis 3 jours à la station de Kara.',
    statut: 'resolue',
    priorite: 'haute',
    dateCreation: '2026-07-28T08:00:00',
    dateMaj: '2026-07-30T16:20:00',
    historique: [
      { date: '2026-07-28T08:00:00', auteur: 'Vous', message: 'Réclamation créée.' },
      { date: '2026-07-28T11:00:00', auteur: 'Service Client', message: 'Ticket transmis à l\'équipe technique.' },
      { date: '2026-07-30T16:20:00', auteur: 'Service Client', message: 'Carte réactivée à distance. Merci de réessayer, et de nous recontacter si le problème persiste.' },
    ],
  },
];

export const reclamationCategories = [
  'Facturation',
  'Technique',
  'Qualité de service',
  'Perte / Vol de carte',
  'Autre',
];
