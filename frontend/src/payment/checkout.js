import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState, useContext, useEffect } from 'react';
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

import { createCustomer, createSubscription, getUserAccount, updatePaymentMethod } from '../payment/payment.service';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [customerId, setCustomerId] = useState('')
  const [paymentLast4, setPaymentLast4] = useState('');

  const { authState } = useContext(AuthContext);
  const { contentState } = useContext(ContentContext);

  const { selectedProducts } = contentState;
  const {
    name,
    email,
    token,
    authUserId,
  } = authState;
  const { productName, planId } = selectedProducts[0];

  useEffect(() => {
    const updateAccount = async () => {
      setIsLoading(true);
      try {
        const account = await getUserAccount(token, authUserId);
        if (!account.payload) {
          return;
        }
        const { stripeCustomerId: customerId, paymentLast4 } = account.payload;
        setCustomerId(customerId);
        setPaymentLast4(paymentLast4);
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    updateAccount();
  }, []);

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    let paymentCustomerId;

    if (!stripe || !elements) {
      return;
    }

    try {
      setIsLoading(true);

      if (!customerId) {
        paymentCustomerId = await addCustomer({
          name,
          email,
          token,
          authUserId
        });
        setCustomerId(paymentCustomerId);
      }

      if (!paymentLast4) {
        const cardElement = elements.getElement(CardElement);
        const paymentMethodId = await addPaymentMethod(cardElement);
        const updatedPaymentMethod = await updatePaymentMethod({ token, paymentMethodId, customerId });
        const { last4 } = updatedPaymentMethod;
        setPaymentLast4(last4);
      }

      if (!planId || !customerId) {
        throw new Error('Cannot create subscription.')
      }

      await createSubscription({ token, customerId, planId });

      setSuccessMessage('Create subscription successfully!');
    } catch (err) {
      setErrorMessage(`Failed to create subscription..., ${err}`);
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
