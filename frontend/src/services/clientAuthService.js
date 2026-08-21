import { apiFetch, clearTokens, setTokens } from './apiClient.js';

export async function registerClient(payload) {
  const data = await apiFetch('/auth/client/register/', {
    method: 'POST',
    body: payload,
    auth: false,
  });
  setTokens({ access: data.access, refresh: data.refresh });
  return data;
}

export async function loginClient(email, password) {
  const data = await apiFetch('/auth/client/login/', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
  setTokens({ access: data.access, refresh: data.refresh });
  return data;
}

export function logoutClient() {
  clearTokens();
}

export function fetchMyProfile() {
  return apiFetch('/auth/client/me/');
}

export function updateMyProfile(payload) {
  return apiFetch('/auth/client/me/', { method: 'PATCH', body: payload });
}
