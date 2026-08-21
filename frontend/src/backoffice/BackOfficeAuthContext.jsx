import { createContext, useContext, useState } from 'react';

// TODO: remplacer par une vraie authentification agent (API + session/JWT)
// une fois le backend branché. Espace distinct de l'admin et du portail
// client : réservé aux agents/superviseurs du service client.
const DEMO_CREDENTIALS = { username: 'agent', password: 'agent' };
const STORAGE_KEY = 'zener_backoffice_user';

const BackOfficeAuthContext = createContext(null);

export function BackOfficeAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username, password) => {
    const ok =
      (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) ||
      (username.trim() !== '' && password.trim() !== '');

    if (!ok) return false;

    const nextUser = { username };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return true;
  };

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <BackOfficeAuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </BackOfficeAuthContext.Provider>
  );
}

export function useBackOfficeAuth() {
  const ctx = useContext(BackOfficeAuthContext);
  if (!ctx) throw new Error('useBackOfficeAuth must be used within BackOfficeAuthProvider');
  return ctx;
}
