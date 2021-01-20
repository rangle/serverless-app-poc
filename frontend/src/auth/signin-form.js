import { useState, useContext } from 'react';
import { AuthContext } from './auth-context';
const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { authenticate, getUserAttributes, getSession } = useContext(
    AuthContext
  );

  const handleSignIn = async (e) => {
    e.preventDefault();
    let signInResult;
    try {
      signInResult = await authenticate({ email, password });
      setSuccessMessage('Sign in success!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const testAttribute = async () => {
    const att = await getSession();
    console.log(att);
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
        <button onClick={testAttribute}>test</button>
      </form>
      <div>{successMessage}</div>
      <div>{errorMessage}</div>
    </div>
  );
};

export default SignInForm;
