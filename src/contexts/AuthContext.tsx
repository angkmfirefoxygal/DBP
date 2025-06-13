import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (sId: string, sNum: number) => void;
  logout: () => void;
  sId?: string;
  sNum?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sId, setSId] = useState<string | undefined>(undefined);
  const [sNum, setSNum] = useState<number | undefined>(undefined);
  

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn') === 'true';
    const storedSId = localStorage.getItem('sId');
     const storedSNum = localStorage.getItem('sNum');

    setIsLoggedIn(storedLogin);
    if (storedSId) setSId(String(storedSId));
    if (storedSNum) setSNum(Number(storedSNum));
  }, []);

  const login = (sId: string , sNum: number) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('sId', sId);
    localStorage.setItem('sNum', String(sNum));

    setIsLoggedIn(true);
    setSId(sId);
    setSNum(sNum);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sId');
    localStorage.removeItem('sNum');
    setIsLoggedIn(false);
    setSId(undefined);
    setSNum(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, sId , sNum}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
