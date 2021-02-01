import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/auth-context';
import ContentService from '../content/content.service';
import PaymentService from '../payment/payment.service';
import ProductCard from './product-card';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');

  const [successMessage, SetSuccessMessage] = useState('');
  const [errorMessage, SetErrorMessage] = useState('');

  const { getSession, paymentMethodId, name, email, sub } = useContext(
    AuthContext
  );

  useEffect(() => {
    const updateProducts = async () => {
      const productDetails = await ContentService.getProductDetails();
      setProducts(productDetails);
    };

    updateProducts();
  }, []);

  useEffect(() => {
    const updateToken = async () => {
      const session = await getSession();
      if (session) {
        setToken(session.token);
      }
    };

    updateToken();
  }, []);

  const handleSubscription = async (successCb, errorCb) => {
    let subscriptionResult;

    try {
      const createCustomerOptions = {
        token,
        sub,
        name,
        email,
      };
      // If a stripe customer Id doesn't exist, create a customer
      const customer = await PaymentService.createCustomer(
        createCustomerOptions
      );
      console.log('customer', customer);
      const customerId = customer.customerId;

      const createSubscriptionOptions = {
        token,
        paymentMethodId,
        customerId,
      };

      subscriptionResult = await PaymentService.createSubscription(
        createSubscriptionOptions
      );
      if (subscriptionResult.hasOwnProperty('error')) {
        errorCb(subscriptionResult.error);
      }
      successCb(subscriptionResult.message);
    } catch (error) {
      errorCb(error.message);
    }
  };

  return (
    <>
      {products &&
        products.map((product) => (
          <div key={product.productName}>
            <ProductCard {...product} />
            <button
              onClick={() =>
                handleSubscription(SetSuccessMessage, SetErrorMessage)
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};

export default ProductList;
