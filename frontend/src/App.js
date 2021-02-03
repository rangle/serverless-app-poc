import ProductList from './products/product-list';
import { Switch, Route } from 'react-router-dom';
import SignUpForm from './auth/signup-form';
import SignInForm from './auth/signin-form';
import Checkout from './payment/checkout';
import AppShell from './app-shell/app-shell';
const App = () => {
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
