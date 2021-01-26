import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '../auth/auth-context';

const stripePromise = loadStripe('pk_test_mzwA5AWnlSi7uBnrCNZ0MWpu00ECzhqFsH');

const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { errorMessage, setErrorMessage } = useState('');
  const { setPaymentMethodId } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement.
    const cardElement = elements.getElement(CardElement);

    // Create payment method via the Stripe.js API
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      // setErrorMessage(error.message);
    }

    console.log('[PaymentMethod]', paymentMethod);

    setPaymentMethodId(paymentMethod.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <>
        <h1>Checkout Page</h1>
        <CreditCardForm />
      </>
    </Elements>
  );
};

export default Checkout;
