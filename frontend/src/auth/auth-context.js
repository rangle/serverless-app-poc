import { createContext, useState } from 'react';
import AuthService from './auth.service';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [name, setName] = useState('Guest');
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  const contextValue = {
    name,
    email,
    token,
    setName,
    setEmail,
    setToken,
    ...AuthService,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
