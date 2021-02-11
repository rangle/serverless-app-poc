import ProductList from './products/product-list';
import { Switch, Route } from 'react-router-dom';
import SignUpForm from './auth/signup-form';
import SignInForm from './auth/signin-form';
import Checkout from './payment/checkout';
import AppShell from './app-shell/app-shell';

import { useContext, useEffect } from 'react';
import { AuthContext } from './auth/auth-context';
import { getAuthUser } from './auth/auth.service';


const App = () => {
  const { dispatch } = useContext(AuthContext);
  // Fetch current user session and update sign-in status in auth store
  useEffect(() => {
    const updateUser = async () => {
      const { attributes, token, authUserId } = await getAuthUser();

      if (!attributes || !token || !authUserId) {
        return;
      }

      const authPayload = {
        name: attributes.name,
        email: attributes.email,
        authUserId,
        token,
      };

      dispatch({
        type: 'SIGN_IN',
        payload: authPayload,
      });
    };

    updateUser();
  }, []);

  return (
    <AppShell>
      <Switch>
        <Route exact path="/">
          <ProductList />
        </Route>
        <Route path="/sign-in">
          <SignInForm />
        </Route>
        <Route path="/sign-up">
          <SignUpForm />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </AppShell>
  );
};

export default App;
