import { createContext, useContext, useState } from 'react';

// TODO: remplacer cette authentification factice (localStorage) par de
// vrais appels à l'API Django (session/JWT) une fois le backend PostgreSQL
// branché. Pour l'instant, n'importe quel couple identifiant/mot de passe
// non vide connecte l'utilisateur (comme le fait `admin/admin` ci-dessous),
// afin de pouvoir naviguer dans tout le panneau d'administration.
const DEMO_CREDENTIALS = { username: 'admin', password: 'admin' };
const STORAGE_KEY = 'zener_admin_user';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
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
    <AdminAuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
