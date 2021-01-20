import { createContext } from 'react';
import AuthService from './auth.service';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const { authenticate, getSession, getUserAttributes, logout } = AuthService;
  return (
    <AuthContext.Provider
      value={{ authenticate, getSession, getUserAttributes, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
