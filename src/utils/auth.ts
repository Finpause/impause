import { jwtDecode } from 'jwt-decode';

const AUTH_TOKEN_KEY = 'auth_token';

export interface AuthToken {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const removeTokens = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<AuthToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token && !isTokenExpired(token);
};


// Add this to your auth.ts file
export const dispatchAuthChangeEvent = () => {
  window.dispatchEvent(new Event('authChange'));
};


export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

