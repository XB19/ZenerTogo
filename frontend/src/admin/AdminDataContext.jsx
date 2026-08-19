import { createContext, useContext, useState } from 'react';
import {
  offres as initialOffres,
  actualites as initialActualites,
  candidatures as initialCandidatures,
  contactMessages as initialContactMessages,
  zencardDemandes as initialZencardDemandes,
} from '../data/adminMockData.js';

// TODO: remplacer ce store en mémoire par de vrais appels à l'API Django
// (PostgreSQL) une fois branchée. En attendant, ce contexte simule les
// opérations CRUD de l'admin (créer/modifier/supprimer une offre, publier
// une actualité, valider/rejeter une demande ZenCard, marquer un message
// comme lu...) pour que le panneau d'administration reste utilisable de
// bout en bout avec des données factices.
const AdminDataContext = createContext(null);

let nextOffreId = Math.max(0, ...initialOffres.map((o) => o.id)) + 1;
let nextActualiteId = Math.max(0, ...initialActualites.map((a) => a.id)) + 1;

export function AdminDataProvider({ children }) {
  const [offres, setOffres] = useState(initialOffres);
  const [actualites, setActualites] = useState(initialActualites);
  const [candidatures] = useState(initialCandidatures);
  const [contactMessages, setContactMessages] = useState(initialContactMessages);
  const [zencardDemandes, setZencardDemandes] = useState(initialZencardDemandes);

  const addOffre = (data) => {
    const offre = { ...data, id: nextOffreId++, created_at: new Date().toISOString() };
    setOffres((list) => [offre, ...list]);
    return offre;
  };

  const updateOffre = (id, data) => {
    setOffres((list) => list.map((o) => (o.id === id ? { ...o, ...data } : o)));
  };

  const deleteOffre = (id) => {
    setOffres((list) => list.filter((o) => o.id !== id));
  };

  const addActualite = (data) => {
    const actualite = { ...data, id: nextActualiteId++, created_at: new Date().toISOString() };
    setActualites((list) => [actualite, ...list]);
    return actualite;
  };

  const deleteActualite = (id) => {
    setActualites((list) => list.filter((a) => a.id !== id));
  };

  const markContactRead = (id) => {
    setContactMessages((list) => list.map((c) => (c.id === id ? { ...c, lu: true } : c)));
  };

  const updateZencardStatut = (id, statut) => {
    setZencardDemandes((list) => list.map((d) => (d.id === id ? { ...d, statut } : d)));
  };

  return (
    <AdminDataContext.Provider
      value={{
        offres,
        addOffre,
        updateOffre,
        deleteOffre,
        actualites,
        addActualite,
        deleteActualite,
        candidatures,
        contactMessages,
        markContactRead,
        zencardDemandes,
        updateZencardStatut,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error('useAdminData must be used within AdminDataProvider');
  return ctx;
}
