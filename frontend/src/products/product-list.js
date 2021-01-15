import { useState, useEffect } from 'react';
import ContentService from '../content/content.service';
import PaymentService from '../payment/payment.service';
import ProductCard from './product-card';

const handleSubscription = async (successCb, errorCb) => {
  let subscriptionResult;
  try {
    subscriptionResult = await PaymentService.createSubscription();
    if (subscriptionResult.hasOwnProperty('error')) {
      errorCb(subscriptionResult.error);
    }
    successCb(subscriptionResult.message);
  } catch (error) {
    errorCb(error.message);
  }
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [successMessage, SetSuccessMessage] = useState('');
  const [errorMessage, SetErrorMessage] = useState('');

  useEffect(() => {
    const updateProducts = async () => {
      const productDetails = await ContentService.getProductDetails();
      setProducts(productDetails);
    };

    updateProducts();
  }, []);

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
