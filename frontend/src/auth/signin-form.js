import { useState } from 'react';
import AuthService from './auth.service';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    let signInResult;
    try {
      signInResult = await AuthService.signIn({ email, password });
      setSuccessMessage('Sign in success!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
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

export default SignInForm;
