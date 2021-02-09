import { createContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  isSignedIn: false,
  authUserId: '', // cognito user Id
  name: '',
  email: '',
  token: '', // cognito ID token
  paymentMethodId: '', // stripe payment method Id
  paymentCustomerId: '', // stripe customer Id
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
    // Fetch user account info (paymentCustomerId and paymentMethodId) from DynamoDB
    case 'FETCH_ACCOUNT':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethodId: action.payload,
      };
    case 'SET_CUSTOMER_ID':
      return {
        ...state,
        paymentCustomerId: action.payload,
      };
    case 'SIGN_OUT':
      return state;
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
