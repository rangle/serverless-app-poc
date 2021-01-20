import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/auth-context';

const Navbar = () => {
  const { getSession } = useContext(AuthContext);
  const [name, setName] = useState('');
  const isLoggedIn = true;

  useEffect(() => {
    getSession().then(({ attributes, user }) => {
      const { name } = attributes;
      setName(name);
    });
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <>
          <div>Welcome back {name}! </div>
          <button>Sign out</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <button>Sign In</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
