import { createContext, useContext, useState } from 'react';
import {
  myZencards,
  myTransactions,
  myReclamations as initialReclamations,
} from '../data/clientPortalMockData.js';

// TODO: remplacer ce store en mémoire par de vrais appels API une fois le
// backend PostgreSQL branché.
const ClientDataContext = createContext(null);

let nextReclamationId = Math.max(0, ...initialReclamations.map((r) => r.id)) + 1;

export function ClientDataProvider({ children }) {
  const [zencards] = useState(myZencards);
  const [transactions] = useState(myTransactions);
  const [reclamations, setReclamations] = useState(initialReclamations);

  const addReclamation = (data) => {
    const id = nextReclamationId++;
    const now = new Date().toISOString();
    const reclamation = {
      id,
      numero: `REC-${new Date().getFullYear()}-${String(id).padStart(4, '0')}`,
      statut: 'ouverte',
      priorite: 'normale',
      dateCreation: now,
      dateMaj: now,
      historique: [{ date: now, auteur: 'Vous', message: 'Réclamation créée.' }],
      ...data,
    };
    setReclamations((list) => [reclamation, ...list]);
    return reclamation;
  };

  return (
    <ClientDataContext.Provider value={{ zencards, transactions, reclamations, addReclamation }}>
      {children}
    </ClientDataContext.Provider>
  );
}

export function useClientData() {
  const ctx = useContext(ClientDataContext);
  if (!ctx) throw new Error('useClientData must be used within ClientDataProvider');
  return ctx;
}
