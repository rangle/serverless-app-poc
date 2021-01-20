import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/auth-context';
import ContentService from '../content/content.service';
import PaymentService from '../payment/payment.service';
import ProductCard from './product-card';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [successMessage, SetSuccessMessage] = useState('');
  const [errorMessage, SetErrorMessage] = useState('');

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const updateProducts = async () => {
      const productDetails = await ContentService.getProductDetails();
      setProducts(productDetails);
    };

    updateProducts();
  }, []);

  const handleSubscription = async (successCb, errorCb) => {
    let subscriptionResult;
    try {
      subscriptionResult = await PaymentService.createSubscription(token);
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
      {products.map((product) => (
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
      <div>{successMessage}</div>
      <div>{errorMessage}</div>
    </>
  );
};

export default ProductList;
