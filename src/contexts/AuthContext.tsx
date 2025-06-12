import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (sId: string) => void;
  logout: () => void;
  sId?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sId, setSId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn') === 'true';
    const storedSId = localStorage.getItem('sId');
    setIsLoggedIn(storedLogin);
    if (storedSId) {
      setSId(storedSId);
    }
  }, []);

  const login = (sId: string) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('sId', sId);
    setIsLoggedIn(true);
    setSId(sId);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sId');
    setIsLoggedIn(false);
    setSId(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, sId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
