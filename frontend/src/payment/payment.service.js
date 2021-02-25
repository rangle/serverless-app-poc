import { STRIPE_SUBSCRIPTION_URL, STRIPE_CUSTOMER_URL, DB_USER_URL, STRIPE_PAYMENT_URL } from '../api/constants';
import { apiClient } from '../api/api.service';

/** Create a customer in Stripe, return customerID */
export const createCustomer = async (customerDetails) => {
  const { token, name, email, authUserId } = customerDetails;
  return apiClient(`${STRIPE_CUSTOMER_URL}`, token, {
    body: {
      name,
      email,
      sub: authUserId
    }
  });
};

export const updatePaymentMethod = async (paymentDetails) => {
  const { token, paymentMethodId, customerId } = paymentDetails;

  console.log(paymentMethodId, customerId)

  return apiClient(`${STRIPE_PAYMENT_URL}`, token, {
    body: {
      customerId,
      paymentMethodId,
    }
  });
};

export const createSubscription = async (subscriptionDetails) => {
  const { token, customerId, planId } = subscriptionDetails;
  return apiClient(`${STRIPE_SUBSCRIPTION_URL}`, token, {
    body: {
      customerId,
      priceId: planId,
    }
  });
};

/** Fetch user account from DynamoDB */
export const getUserAccount = async (token, authUserId) => {
  return apiClient(`${DB_USER_URL}/${authUserId}`, token);
};