import { createContext, useContext, useState } from 'react';
import {
  agents as initialAgents,
  appels as initialAppels,
  tickets as initialTickets,
  affectations as initialAffectations,
  slaPolicies,
  zencardDossiers,
  sapRecords,
  reports,
} from '../data/backOfficeMockData.js';

// TODO: remplacer ce store en mémoire par de vrais appels API (CRM / centre
// d'appels / SAP) une fois le backend branché.
const BackOfficeDataContext = createContext(null);

let nextAffectationId = Math.max(0, ...initialAffectations.map((a) => a.id)) + 1;

export function BackOfficeDataProvider({ children }) {
  const [agents] = useState(initialAgents);
  const [appels] = useState(initialAppels);
  const [tickets, setTickets] = useState(initialTickets);
  const [affectations, setAffectations] = useState(initialAffectations);

  const assignTicket = (ticketId, agentNom) => {
    setTickets((list) =>
      list.map((t) => (t.id === ticketId ? { ...t, agentAssigne: agentNom, statut: 'en_cours' } : t))
    );

    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket) {
      setAffectations((list) => [
        {
          id: nextAffectationId++,
          ticket: ticket.numero,
          agent: agentNom,
          dateAffectation: new Date().toISOString(),
          statut: 'en_cours',
        },
        ...list,
      ]);
    }
  };

  const updateTicketStatut = (ticketId, statut) => {
    setTickets((list) => list.map((t) => (t.id === ticketId ? { ...t, statut } : t)));
  };

  return (
    <BackOfficeDataContext.Provider
      value={{
        agents,
        appels,
        tickets,
        assignTicket,
        updateTicketStatut,
        affectations,
        slaPolicies,
        zencardDossiers,
        sapRecords,
        reports,
      }}
    >
      {children}
    </BackOfficeDataContext.Provider>
  );
}

export function useBackOfficeData() {
  const ctx = useContext(BackOfficeDataContext);
  if (!ctx) throw new Error('useBackOfficeData must be used within BackOfficeDataProvider');
  return ctx;
}
