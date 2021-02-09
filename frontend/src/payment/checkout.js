import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
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

const stripePromise = loadStripe('pk_test_mzwA5AWnlSi7uBnrCNZ0MWpu00ECzhqFsH');

const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { authState, dispatch } = useContext(AuthContext);
  const { contentState } = useContext(ContentContext);
  const { selectedProducts } = contentState;
  const {
    paymentMethodId,
    paymentCustomerId,
    name,
    email,
    token,
    authUserId,
  } = authState;

  console.log('credential', authState);
  console.log('selected', selectedProducts);

  const updatePaymentMethod = async (card) => {
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        throw error;
      }

      dispatch({
        type: 'SET_PAYMENT_METHOD',
        payload: paymentMethod.id,
      });
      // TODO: Update to DynamoDB
    } catch (err) {
      throw err;
    }
  };

  const updateCustomer = async () => {
    try {
      const createCustomerOptions = {
        name,
        email,
        token,
        authUserId,
      };
      // If a stripe customer Id doesn't exist, create a customer
      const customer = await createCustomer(createCustomerOptions);

      dispatch({
        type: 'SET_CUSTOMER_ID',
        payload: customer.customerId,
      });
      // TODO: Update to DynamoDB
    } catch (err) {
      throw err;
    }
  };

  const addSubscription = async () => {
    try {
      const createSubscriptionOptions = {
        token,
        paymentMethodId,
        paymentCustomerId,
      };

      await createSubscription(createSubscriptionOptions);
      setSuccessMessage('Create subscription successfully!');
    } catch (err) {
      setErrorMessage('Failed to create subscription...', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!paymentCustomerId) {
      updateCustomer();
    }

    if (!paymentMethodId) {
      const cardElement = elements.getElement(CardElement);
      await updatePaymentMethod(cardElement);
    }

    await addSubscription();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <CardElement />
      <FormButton
        type="submit"
        disabled={!stripe}
        value="Subscribe for 30-day access"
      />
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
  return (
    <StyledFormContainer>
      <StyledHeader>Payment</StyledHeader>
      <StyledSubHeader>Amount to pay $59.00</StyledSubHeader>
      <Elements stripe={stripePromise}>
        <CreditCardForm />
      </Elements>
    </StyledFormContainer>
  );
};

export default Checkout;
