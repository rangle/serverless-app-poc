import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './auth-context';
import { authenticate, getAuthUser } from '../auth/auth.service';
import { StyledHeader, StyledSubHeader } from '../components/common';
import {
  StyledFormContainer,
  StyledForm,
  StyledFormItem,
  StyledFormLabel,
  StyledFormInput,
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../components/form';

import { FormButton } from '../components/button';

const SignInForm = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const updateUser = async() => {
    const { attributes, token, authUserId } = await getAuthUser();
    const authPayload = {
      name: attributes.name,
      email: attributes.email,
      authUserId,
      token,
    };
    return dispatch({
      type: 'SIGN_IN',
      payload: authPayload,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await authenticate({ email, password });
      updateUser();
      setSuccessMessage('Sign in success!');
      history.push('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <StyledFormContainer>
      <StyledHeader>Welcome Back!</StyledHeader>
      <StyledSubHeader>Sign in to your BiteTut Account</StyledSubHeader>
      <StyledForm onSubmit={handleSignIn}>
        <StyledFormItem>
          <StyledFormLabel htmlFor="email">Email</StyledFormLabel>
          <StyledFormInput
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </StyledFormItem>
        <StyledFormItem>
          <StyledFormLabel htmlFor="password">Password</StyledFormLabel>
          <StyledFormInput
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledFormItem>

        <FormButton type="submit" value="Sign In" />
        {successMessage && (
          <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
        )}
        {errorMessage && (
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        )}
      </StyledForm>
    </StyledFormContainer>
  );
};

export default SignInForm;
