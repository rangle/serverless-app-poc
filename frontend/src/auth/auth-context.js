import { createContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  isSignedIn: false,
  authUserId: '', // cognito user Id
  name: '',
  email: '',
  token: '', // cognito ID token
  // customerId: '', // stripe customer ID
  // paymentLast4: '', // last 4 digits of the default payment method if there is any
};

const reducer = (state, action) => {
  switch (action.type) {
    // Update auth state with Cognito authUserId, name and email from Cognito session
    case 'SIGN_IN':
      return {
        ...state,
        isSignedIn: true,
        ...action.payload,
      };
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [authState, dispatch] = useReducer(reducer, initialState);
  const value = { authState, dispatch };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
