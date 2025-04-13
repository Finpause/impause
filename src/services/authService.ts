import { setAuthToken, removeTokens, getAuthHeaders } from '../utils/auth';

// Define the auth base URL
const AUTH_BASE_URL = 'https://auth.impause.tech';

interface AuthResponse {
  token: string;
}

interface UserProfile {
  id: string;
  email: string;
  // Add other user fields as needed
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  setAuthToken(data.token);
  return data;
};
export const register = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
): Promise<AuthResponse> => {
  const response = await fetch(`${AUTH_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      email, 
      password,
      firstName,
      lastName
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();
  setAuthToken(data.token);
  return data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch(`${AUTH_BASE_URL}/me`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

export const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  const response = await fetch(`${AUTH_BASE_URL}/update-password`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!response.ok) {
    throw new Error('Failed to update password');
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      console.error('Logout API call failed');
    }
  } catch (error) {
    console.error('Error during logout API call:', error);
  } finally {
    // Always clear local tokens, even if the API call fails
    removeTokens();
  }
};