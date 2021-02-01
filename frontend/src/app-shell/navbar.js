import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/auth-context';

const Navbar = () => {
  const { getSession, signOut, name, setName, token } = useContext(AuthContext);

  console.log('token is', token);

  useEffect(() => {
    getSession().then(({ attributes, user }) => {
      const { name } = attributes;
      setName(name);
    });
  }, []);

  return (
    <div>
      {token && (
        <>
          <div>Welcome back {name}! </div>
          <button onClick={signOut}>Sign out</button>
        </>
      )}

      {!token && (
        <>
          <button>Sign In</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
