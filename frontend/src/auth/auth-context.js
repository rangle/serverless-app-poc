import { createContext, useState } from 'react';
import AuthService from './auth.service';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [name, setName] = useState('Guest');
  const [sub, setSub] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState('');

  console.log('sub is', sub);

  const contextValue = {
    sub,
    name,
    email,
    token,
    paymentMethodId,
    setSub,
    setName,
    setEmail,
    setToken,
    setPaymentMethodId,
    ...AuthService,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
