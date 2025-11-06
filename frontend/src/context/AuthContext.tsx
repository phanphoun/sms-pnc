import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../api/axiosInstance';
import { CurrentUser, LoginCredentials, Role } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: CurrentUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasRole: (roles: Role | Role[]) => boolean;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get<CurrentUser>('/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        localStorage.removeItem('access_token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axiosInstance.post('/token/', credentials);
      const { access } = response.data;
      
      localStorage.setItem('access_token', access);
      
      // Fetch user details
      const userResponse = await axiosInstance.get<CurrentUser>('/me/');
      setUser(userResponse.data);
      
      toast.success('Login successful!');
    } catch (error: any) {
      console.error('Login failed:', error);
      const message = error.response?.data?.detail || 'Login failed. Please check your credentials.';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const hasRole = (roles: Role | Role[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const refreshUser = async () => {
    try {
      const response = await axiosInstance.get<CurrentUser>('/me/');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasRole, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

