import { useState, useContext } from 'react';
import { AuthContext } from './auth-context';
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
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setSignInEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default SignInForm;
