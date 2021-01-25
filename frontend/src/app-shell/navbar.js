import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/auth-context';

const Navbar = () => {
  const { getSession, name, setName, token } = useContext(AuthContext);

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
          <button>Sign out</button>
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
