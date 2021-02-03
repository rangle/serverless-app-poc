import { useState, useContext } from 'react';
import { AuthContext } from './auth-context';
import {
  StyledHeader,
  StyledSubHeader,
  StyledFlexContainer,
} from '../components/common-styles';
import {
  StyledFormContainer,
  StyledFormItem,
  StyledFormLabel,
  StyledFormInput,
  StyledError,
  StyledSuccessMessage,
} from '../components/form';

import { FormButton } from '../components/button';
const SignInForm = () => {
  const [email, setSignInEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    authenticate,
    getSession,
    setSub,
    setToken,
    setName,
    setEmail,
  } = useContext(AuthContext);

  const updateAuthContext = async () => {
    try {
      const { attributes, token, sub } = await getSession();
      setSub(sub);
      setToken(token);
      setName(attributes.name);
      setEmail(attributes.email);
    } catch (error) {
      throw error;
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await authenticate({ email, password });
      await updateAuthContext();
      setSuccessMessage('Sign in success!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <StyledFlexContainer>
      <StyledHeader>Welcome Back!</StyledHeader>
      <StyledSubHeader>Sign in to your BiteTut Account</StyledSubHeader>
      <StyledFormContainer onSubmit={handleSignIn}>
        <StyledFormItem>
          <StyledFormLabel for="email">Email</StyledFormLabel>
          <StyledFormInput
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setSignInEmail(e.target.value)}
          />
        </StyledFormItem>
        <StyledFormItem>
          <StyledFormLabel for="password">Password</StyledFormLabel>
          <StyledFormInput
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledFormItem>

        <FormButton type="submit" value="Sign In" />
        {successMessage && (
          <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
        )}
        {errorMessage && <StyledError>{errorMessage}</StyledError>}
      </StyledFormContainer>
    </StyledFlexContainer>
  );
};

export default SignInForm;
