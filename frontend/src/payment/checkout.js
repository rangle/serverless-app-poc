import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '../auth/auth-context';

import {
  StyledHeader,
  StyledSubHeader,
  StyledFlexContainer,
} from '../components/common-styles';
import {
  StyledFormContainer,
  StyledError,
  StyledSuccessMessage,
} from '../components/form';

import { FormButton } from '../components/button';

const stripePromise = loadStripe('pk_test_mzwA5AWnlSi7uBnrCNZ0MWpu00ECzhqFsH');

const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setPaymentMethodId } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
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
      setErrorMessage(error.message);
    }

    console.log('[PaymentMethod]', paymentMethod);

    setSuccessMessage(
      `create payment method ${paymentMethod.id} successfully!`
    );

    setPaymentMethodId(paymentMethod.id);
  };

  return (
    <StyledFormContainer onSubmit={handleSubmit}>
      <CardElement />
      <FormButton
        type="submit"
        disabled={!stripe}
        value="Subscribe for 30-day access"
      />
      {errorMessage && <StyledError>Error: {errorMessage}</StyledError>}
      {successMessage && (
        <StyledSuccessMessage>Success: {successMessage}</StyledSuccessMessage>
      )}
    </StyledFormContainer>
  );
};

const Checkout = () => {
  return (
    <StyledFlexContainer>
      <StyledHeader>Payment</StyledHeader>
      <StyledSubHeader>Amount to pay $59.00</StyledSubHeader>
      <Elements stripe={stripePromise}>
        <CreditCardForm />
      </Elements>
    </StyledFlexContainer>
  );
};

export default Checkout;
