import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '../auth/auth-context';
import { ContentContext } from '../content/content-context';

import { StyledHeader, StyledSubHeader } from '../components/common';
import {
  StyledFormContainer,
  StyledForm,
  StyledErrorMessage,
  StyledSuccessMessage,
} from '../components/form';
import { FormButton } from '../components/button';

import { createCustomer, createSubscription } from '../payment/payment.service';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { authState } = useContext(AuthContext);
  const { contentState } = useContext(ContentContext);

  const { selectedProducts } = contentState;
  const {
    name,
    email,
    token,
    authUserId,
  } = authState;
  const { productName } = selectedProducts[0];

  const addPaymentMethod = async (card) => {
    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      return paymentMethod.id
    } catch (err) {
      throw err;
    }
  };

  const addCustomer = async (customerDetails) => {
    try {
      const customerResult = await createCustomer(customerDetails);
      return customerResult.customerId;
    } catch (err) {
      throw err;
    }
  };

  const addSubscription = async (token, paymentMethodId, paymentCustomerId) => {
    try {
      const createSubscriptionOptions = {
        token,
        paymentMethodId,
        customerId: paymentCustomerId,
      };
      await createSubscription(createSubscriptionOptions);
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    let paymentCustomerId;
    let paymentMethodId;

    try {
      setIsLoading(true);
      if (!paymentCustomerId) {
        paymentCustomerId = await addCustomer({
          name,
          email,
          token,
          authUserId
        });

        const cardElement = elements.getElement(CardElement);
        paymentMethodId = await addPaymentMethod(cardElement);
      }

      addSubscription(authState.token, paymentMethodId, paymentCustomerId)

      setSuccessMessage('Create subscription successfully!');
    } catch (err) {
      setErrorMessage('Failed to create subscription...', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <CardElement />
      <FormButton
        type="submit"
        disabled={!stripe}
        value="Subscribe for 30-day access"
      />
      {isLoading && (
        <StyledSuccessMessage>Creating subscription for {productName}...</StyledSuccessMessage>
      )}
      {errorMessage && (
        <StyledErrorMessage>Error: {errorMessage}</StyledErrorMessage>
      )}
      {successMessage && (
        <StyledSuccessMessage>Success: {successMessage}</StyledSuccessMessage>
      )}
    </StyledForm>
  );
};

const Checkout = () => {
  const { contentState } = useContext(ContentContext);
  const { authState } = useContext(AuthContext);

  const { selectedProducts } = contentState;
  const { isSignedIn } = authState;

  if (!isSignedIn) {
    return (<Redirect to="/sign-in" />)
  }

  if (selectedProducts.length === 0) {
    return (<Redirect to="/" />)
  }

  const { productName, price } = selectedProducts[0];

  return (
    <StyledFormContainer>
      <StyledHeader>Checkout</StyledHeader>
      <StyledSubHeader>Subscribe to {productName}</StyledSubHeader>
      <div>Amount to pay: CA${price}</div>
      <Elements stripe={stripePromise}>
        <CreditCardForm />
      </Elements>
    </StyledFormContainer>
  );
};

export default Checkout;
