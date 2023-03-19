// lib/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextData {
  isLoggedIn: boolean;
  userRole: string;
  updateLoginStatus: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
  }
  

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  userRole: '',
  updateLoginStatus: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const updateLoginStatus = () => {
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    if (token) {
      setIsLoggedIn(true);
      const decodedToken: { role: string } = JSON.parse(decodeURIComponent(token.split('=')[1]));
      setUserRole(decodedToken.role);
    } else {
      setIsLoggedIn(false);
      setUserRole('');
    }
  };

  useEffect(() => {
    updateLoginStatus();
  }, []);

  useEffect(() => {
    const onLoginChange = () => {
      updateLoginStatus();
    };

    window.addEventListener('loginChange', onLoginChange);

    return () => {
      window.removeEventListener('loginChange', onLoginChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, updateLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
