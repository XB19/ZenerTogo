/**
 * Données factices du Back-office Customer Care.
 *
 * TODO: remplacer par de vrais appels API (CRM / centre d'appels / SAP)
 * une fois le backend branché.
 */

export const agents = [
  { id: 1, nom: 'Akouvi Mensah', email: 'a.mensah@zener.tg', equipe: 'Réclamations', statut: 'disponible', ticketsTraites: 128, dateEmbauche: '2023-02-01' },
  { id: 2, nom: 'Komi Adjovi', email: 'k.adjovi@zener.tg', equipe: 'Support technique', statut: 'en_appel', ticketsTraites: 96, dateEmbauche: '2023-06-15' },
  { id: 3, nom: 'Yawa Dogbe', email: 'y.dogbe@zener.tg', equipe: 'ZenCard', statut: 'pause', ticketsTraites: 74, dateEmbauche: '2024-01-10' },
  { id: 4, nom: 'Sena Kokou', email: 's.kokou@zener.tg', equipe: 'Réclamations', statut: 'disponible', ticketsTraites: 152, dateEmbauche: '2022-09-20' },
  { id: 5, nom: 'Ama Tossou', email: 'a.tossou@zener.tg', equipe: 'Support technique', statut: 'hors_ligne', ticketsTraites: 63, dateEmbauche: '2024-11-04' },
];

export const appels = [
  { id: 1, date: '2026-08-19T09:12:00', client: 'Efoe Agbeko', numero: '+228 95 66 77 88', agent: 'Akouvi Mensah', duree: 312, motif: 'Réclamation facturation', statut: 'traite' },
  { id: 2, date: '2026-08-19T09:40:00', client: 'Nadia Bakoubatevi', numero: '+228 97 88 99 00', agent: 'Komi Adjovi', duree: 184, motif: 'Carte non reconnue', statut: 'traite' },
  { id: 3, date: '2026-08-19T10:05:00', client: 'Togo Transport SARL', numero: '+228 96 77 88 99', agent: null, duree: 0, motif: 'Demande ZenCard entreprise', statut: 'manque' },
  { id: 4, date: '2026-08-19T10:22:00', client: 'Josué Komadan', numero: '+228 90 12 34 56', agent: 'Sena Kokou', duree: 96, motif: 'Suivi réclamation REC-2026-0142', statut: 'traite' },
  { id: 5, date: '2026-08-19T10:45:00', client: 'Kodjo Amenyo', numero: '+228 93 44 55 66', agent: 'Akouvi Mensah', duree: 0, motif: 'Réclamation station fermée', statut: 'en_cours' },
];

export const tickets = [
  {
    id: 1,
    numero: 'TCK-2026-0142',
    client: 'Josué Komadan',
    sujet: 'Débit incorrect sur ma ZenCard',
    categorie: 'Facturation',
    canal: 'Portail client',
    statut: 'en_cours',
    priorite: 'normale',
    agentAssigne: 'Sena Kokou',
    dateCreation: '2026-08-15T10:12:00',
    slaEcheance: '2026-08-18T10:12:00',
  },
  {
    id: 2,
    numero: 'TCK-2026-0143',
    client: 'Efoe Agbeko',
    sujet: 'Contestation montant prélevé',
    categorie: 'Facturation',
    canal: 'Appel',
    statut: 'nouveau',
    priorite: 'haute',
    agentAssigne: null,
    dateCreation: '2026-08-19T09:12:00',
    slaEcheance: '2026-08-19T17:12:00',
  },
  {
    id: 3,
    numero: 'TCK-2026-0141',
    client: 'Nadia Bakoubatevi',
    sujet: 'Carte non reconnue à la borne',
    categorie: 'Technique',
    canal: 'Appel',
    statut: 'en_cours',
    priorite: 'haute',
    agentAssigne: 'Komi Adjovi',
    dateCreation: '2026-08-19T09:40:00',
    slaEcheance: '2026-08-19T13:40:00',
  },
  {
    id: 4,
    numero: 'TCK-2026-0098',
    client: 'Josué Komadan',
    sujet: 'ZenCard non reconnue à la borne',
    categorie: 'Technique',
    canal: 'Portail client',
    statut: 'resolu',
    priorite: 'haute',
    agentAssigne: 'Komi Adjovi',
    dateCreation: '2026-07-28T08:00:00',
    slaEcheance: '2026-07-29T08:00:00',
  },
  {
    id: 5,
    numero: 'TCK-2026-0144',
    client: 'Togo Transport SARL',
    sujet: 'Demande ZenCard entreprise multi-cartes',
    categorie: 'ZenCard',
    canal: 'Appel',
    statut: 'nouveau',
    priorite: 'normale',
    agentAssigne: null,
    dateCreation: '2026-08-19T10:05:00',
    slaEcheance: '2026-08-20T10:05:00',
  },
  {
    id: 6,
    numero: 'TCK-2026-0140',
    client: 'Kodjo Amenyo',
    sujet: 'Station fermée pendant les horaires annoncés',
    categorie: 'Qualité de service',
    canal: 'Email',
    statut: 'ferme',
    priorite: 'basse',
    agentAssigne: 'Akouvi Mensah',
    dateCreation: '2026-08-08T13:10:00',
    slaEcheance: '2026-08-11T13:10:00',
  },
];

export const affectations = [
  { id: 1, ticket: 'TCK-2026-0142', agent: 'Sena Kokou', dateAffectation: '2026-08-15T15:30:00', statut: 'en_cours' },
  { id: 2, ticket: 'TCK-2026-0141', agent: 'Komi Adjovi', dateAffectation: '2026-08-19T09:45:00', statut: 'en_cours' },
  { id: 3, ticket: 'TCK-2026-0098', agent: 'Komi Adjovi', dateAffectation: '2026-07-28T11:00:00', statut: 'terminee' },
  { id: 4, ticket: 'TCK-2026-0140', agent: 'Akouvi Mensah', dateAffectation: '2026-08-08T14:00:00', statut: 'terminee' },
];

export const slaPolicies = [
  { id: 1, categorie: 'Facturation', priorite: 'haute', delaiReponse: '2h', delaiResolution: '8h' },
  { id: 2, categorie: 'Facturation', priorite: 'normale', delaiReponse: '4h', delaiResolution: '24h' },
  { id: 3, categorie: 'Technique', priorite: 'haute', delaiReponse: '1h', delaiResolution: '4h' },
  { id: 4, categorie: 'Technique', priorite: 'normale', delaiReponse: '4h', delaiResolution: '24h' },
  { id: 5, categorie: 'ZenCard', priorite: 'normale', delaiReponse: '4h', delaiResolution: '24h' },
  { id: 6, categorie: 'Qualité de service', priorite: 'basse', delaiReponse: '8h', delaiResolution: '72h' },
];

export const zencardDossiers = [
  { id: 1, numero: 'ZC-2024-001834', client: 'Josué Komadan', type: 'Particulier', statut: 'active', solde: 45000, derniereActivite: '2026-08-14' },
  { id: 2, numero: 'ZC-2025-004421', client: 'Josué Komadan', type: 'Entreprise', statut: 'active', solde: 128500, derniereActivite: '2026-08-10' },
  { id: 3, numero: 'ZC-2026-000512', client: 'Efoe Agbeko', type: 'Particulier', statut: 'en_attente', solde: 0, derniereActivite: '2026-08-19' },
  { id: 4, numero: 'ZC-2025-002210', client: 'Togo Transport SARL', type: 'Entreprise', statut: 'suspendue', solde: 15000, derniereActivite: '2026-07-02' },
];

export const sapRecords = [
  { id: 1, type: 'Client', reference: 'SAP-CU-004821', libelle: 'Josué Komadan', statutSync: 'synchronise', derniereSync: '2026-08-19T06:00:00' },
  { id: 2, type: 'Contrat', reference: 'SAP-CT-001192', libelle: 'ZenCard Entreprise — Togo Transport SARL', statutSync: 'synchronise', derniereSync: '2026-08-19T06:00:00' },
  { id: 3, type: 'Facture', reference: 'SAP-FA-118820', libelle: 'Facture recharge #50000 FCFA', statutSync: 'en_attente', derniereSync: '2026-08-18T22:00:00' },
  { id: 4, type: 'Client', reference: 'SAP-CU-004902', libelle: 'Efoe Agbeko', statutSync: 'erreur', derniereSync: '2026-08-18T22:00:00' },
];

export const reports = [
  { id: 1, nom: 'Rapport hebdomadaire tickets', type: 'Tickets', periode: '11 – 17 août 2026', dateGeneration: '2026-08-18T07:00:00', format: 'PDF' },
  { id: 2, nom: 'Suivi SLA août 2026', type: 'SLA', periode: 'Août 2026', dateGeneration: '2026-08-19T07:00:00', format: 'XLSX' },
  { id: 3, nom: 'Performance agents — Semaine 33', type: 'Agents', periode: '11 – 17 août 2026', dateGeneration: '2026-08-18T07:05:00', format: 'PDF' },
  { id: 4, nom: 'Volume appels quotidien', type: 'Appels', periode: '19 août 2026', dateGeneration: '2026-08-19T08:00:00', format: 'CSV' },
];

export const dashboardStats = {
  ticketsOuverts: tickets.filter((t) => t.statut !== 'ferme' && t.statut !== 'resolu').length,
  ticketsResolusMois: 84,
  tauxResolutionSLA: 92,
  appelsAujourdhui: appels.length,
  tempsMoyenReponseMin: 6,
  satisfactionClient: 4.4,
};
