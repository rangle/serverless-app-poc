import { useState, useContext } from 'react';
import { AuthContext } from './auth-context';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
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

const SignUpForm = () => {
  const [name, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { signUp, getSession, setToken, setName, setEmail } = useContext(
    AuthContext
  );

  const attributeEmail = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  });
  const attributeName = new CognitoUserAttribute({
    Name: 'name',
    Value: name,
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    let signUpResult;
    try {
      signUpResult = await signUp({
        name,
        email,
        password,
        attributeEmail,
        attributeName,
      });
      setSuccessMessage('Sign up successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <StyledFlexContainer>
      <StyledHeader>New to BiteTut?</StyledHeader>
      <StyledSubHeader>Sign up for your BiteTut Account</StyledSubHeader>
      <StyledFormContainer onSubmit={handleSignUp}>
        <StyledFormItem>
          <StyledFormLabel for="name">Full Name</StyledFormLabel>
          <StyledFormInput
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </StyledFormItem>
        <StyledFormItem>
          <StyledFormLabel for="email">Email</StyledFormLabel>
          <StyledFormInput
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setUserEmail(e.target.value)}
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

        <FormButton type="submit" value="Sign Up" />
        {successMessage && (
          <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
        )}
        {errorMessage && <StyledError>{errorMessage}</StyledError>}
      </StyledFormContainer>
    </StyledFlexContainer>
  );
};

export default SignUpForm;
