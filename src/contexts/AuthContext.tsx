import React, { createContext, useContext, useState, useEffect } from 'react'; import { useQuery } from '@tanstack/react-query'; import { checkAuthStatus } from '../api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  const { data: authStatus } = useQuery({
    queryKey: ['authStatus'],
    queryFn: checkAuthStatus,
    retry: false
  });

  useEffect(() => {
    if (authStatus?.user) {
      setUser(authStatus.user);
    }
  }, [authStatus]);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    setUser(data.user);
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!response.ok) throw new Error('Registration failed');
    const data = await response.json();
    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      user,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}