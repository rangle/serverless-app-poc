import ProductList from './products/product-list';
import SignUpForm from './auth/signup-form';
import SignInForm from './auth/signin-form';
import Navbar from './app-shell/navbar';
import { AuthProvider } from './auth/auth-context';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <SignUpForm />
      <SignInForm />
      <ProductList />
    </AuthProvider>
  );
};

export default App;
