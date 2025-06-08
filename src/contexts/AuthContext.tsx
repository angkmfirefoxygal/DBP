import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (num: number) => void;
  logout: () => void;
  studentNum?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentNum, setStudentNum] = useState<number | undefined>(undefined);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn') === 'true';
    const storedNum = localStorage.getItem('studentNum');
    setIsLoggedIn(storedLogin);
    if (storedNum) {
      setStudentNum(Number(storedNum));
    }
  }, []);

  const login = (num: number) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('studentNum', num.toString());
    setIsLoggedIn(true);
    setStudentNum(num);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('studentNum');
    setIsLoggedIn(false);
    setStudentNum(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, studentNum }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
