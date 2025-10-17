'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type User = {
    name: string;
    email: string;
    listeningHistory: string[];
    preferredGenres: string[];
    preferredArtists: string[];
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
    name: 'Guest User',
    email: 'guest@melodiaverse.app',
    listeningHistory: ['298fd9e9-231a-4065-a65c-de45cb8e308e', 'e3a5cf31-cd6b-4303-a5a9-4c60965fd149'],
    preferredGenres: ['pop rock', 'synthpop', 'indie rock'],
    preferredArtists: ['Arijit Singh', 'Coldplay', 'Daft Punk']
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(() => {
    setUser(MOCK_USER);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
