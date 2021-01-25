import { useState, useContext } from 'react';
import { AuthContext } from './auth-context';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
      <div>{successMessage}</div>
      <div>{errorMessage}</div>
    </div>
  );
};

export default SignUpForm;
