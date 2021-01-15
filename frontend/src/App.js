import ProductList from './products/product-list';
import SignUpForm from './auth/signup-form';
import SignInForm from './auth/signin-form';

const App = () => {
  return (
    <div>
      <SignUpForm />
      <SignInForm />
      <ProductList />
    </div>
  );
};

export default App;
