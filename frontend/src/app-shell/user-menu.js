import { useContext } from 'react';
import { LinkButton } from '../components/button';
import { AuthContext } from '../auth/auth-context';
import { signOut } from '../auth/auth.service';

const UserMenu = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const { isSignedIn, name } = authState;

  const handleSignOut = () => {
    // Sign out from cognito session - clear local storage credential
    signOut();
    return dispatch({
      type: 'SIGN_OUT',
    });
  };

  return (
    <>
      {isSignedIn && (
        <>
          <div>{name}</div>
          <LinkButton onClick={handleSignOut}>Sign out</LinkButton>
        </>
      )}

      {!isSignedIn && (
        <>
          <LinkButton to="/sign-in">Sign in</LinkButton>
        </>
      )}
    </>
  );
};

export default UserMenu;
