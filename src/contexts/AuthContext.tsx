import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: User) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on email
    let mockUser: User;
    if (email.includes('admin')) {
      mockUser = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin',
        registrationDate: '2024-01-01',
        status: 'active'
      };
    } else if (email.includes('moderator')) {
      mockUser = {
        id: '2',
        email,
        name: 'Moderator User',
        role: 'moderator',
        registrationDate: '2024-01-01',
        status: 'active'
      };
    } else if (email.includes('ambassador')) {
      mockUser = {
        id: '3',
        email,
        name: 'Ambassador User',
        role: 'ambassador',
        registrationDate: '2024-01-01',
        status: 'active'
      };
    } else {
      mockUser = {
        id: '4',
        email,
        name: 'John Doe',
        role: 'participant',
        university: 'Tech University',
        phone: '+1234567890',
        registrationDate: '2024-01-15',
        status: 'active'
      };
    }
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock signup - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: 'participant',
      university: userData.university,
      phone: userData.phone,
      registrationDate: new Date().toISOString(),
      status: 'active'
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};