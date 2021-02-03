import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/auth-context';
import { LinkButton } from '../components/button';

const Navbar = () => {
  const { getSession, signOut, name, setName, token } = useContext(AuthContext);

  console.log('token is', token);

  useEffect(() => {
    getSession().then(({ attributes }) => {
      const { name } = attributes;
      setName(name);
    });
  }, []);

  return (
    <>
      {token && (
        <>
          <div>Welcome back {name}! </div>
          <LinkButton onClick={signOut}>Sign out</LinkButton>
        </>
      )}

      {!token && (
        <>
          <LinkButton to="/sign-in">Sign in</LinkButton>
        </>
      )}
    </>
  );
};

export default Navbar;
