import { useState, useContext } from 'react';
import { AuthContext } from './auth-context';
import { signUp } from '../auth/auth.service';
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

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const signUpResult = await signUp({
        name,
        email,
        password,
      });

      setSuccessMessage(
        `Sign up successfully! Please check with your email ${email} to confirm your registration.`
      );
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledFormContainer>
      <StyledHeader>New to BiteTut?</StyledHeader>
      <StyledSubHeader>Sign up for your BiteTut Account</StyledSubHeader>
      <StyledForm onSubmit={handleSignUp}>
        <StyledFormItem>
          <StyledFormLabel htmlFor="name">Full Name</StyledFormLabel>
          <StyledFormInput
            type="text"
            id="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </StyledFormItem>
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

        <FormButton type="submit" value="Sign Up" disabled={isLoading} />
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

export default SignUpForm;
