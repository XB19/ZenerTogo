/**
 * Petit client HTTP pour l'API Django (backend/). Gère la base URL, le
 * JSON, l'en-tête d'autorisation JWT et le rafraîchissement automatique du
 * token d'accès en cas de 401.
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const ACCESS_KEY = 'zener_client_access';
const REFRESH_KEY = 'zener_client_refresh';

export function getTokens() {
  return {
    access: localStorage.getItem(ACCESS_KEY),
    refresh: localStorage.getItem(REFRESH_KEY),
  };
}

export function setTokens({ access, refresh }) {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

async function refreshAccessToken() {
  const { refresh } = getTokens();
  if (!refresh) return null;

  const res = await fetch(`${API_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    clearTokens();
    return null;
  }

  const data = await res.json();
  setTokens({ access: data.access });
  return data.access;
}

/**
 * @param {string} path chemin relatif à l'API, ex. '/auth/client/me/'
 * @param {object} options { method, body, auth, isFormData }
 *   - body: objet JS (sérialisé en JSON) ou FormData (upload de fichiers)
 *   - auth: true pour joindre le token d'accès (par défaut true)
 */
export async function apiFetch(path, { method = 'GET', body, auth = true } = {}) {
  const isFormData = body instanceof FormData;
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';

  if (auth) {
    const { access } = getTokens();
    if (access) headers.Authorization = `Bearer ${access}`;
  }

  const doFetch = () =>
    fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

  let res = await doFetch();

  if (res.status === 401 && auth) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      headers.Authorization = `Bearer ${newAccess}`;
      res = await doFetch();
    }
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error('Erreur API');
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}
