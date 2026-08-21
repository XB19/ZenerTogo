import { createContext, useContext, useEffect, useState } from 'react';
import { getTokens } from '../services/apiClient.js';
import {
  fetchMyProfile,
  loginClient,
  logoutClient,
  registerClient,
  updateMyProfile,
} from '../services/clientAuthService.js';

const ClientAuthContext = createContext(null);

export function ClientAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { access } = getTokens();
    if (!access) {
      setLoading(false);
      return;
    }

    fetchMyProfile()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    await loginClient(email, password);
    const profile = await fetchMyProfile();
    setUser(profile);
    return profile;
  };

  const register = async (payload) => {
    const profile = await registerClient(payload);
    setUser(profile);
    return profile;
  };

  const updateProfile = async (payload) => {
    const profile = await updateMyProfile(payload);
    setUser(profile);
    return profile;
  };

  const logout = () => {
    logoutClient();
    setUser(null);
  };

  return (
    <ClientAuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, register, updateProfile, logout }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const ctx = useContext(ClientAuthContext);
  if (!ctx) throw new Error('useClientAuth must be used within ClientAuthProvider');
  return ctx;
}
