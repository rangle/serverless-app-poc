import { STRIPE_SUBSCRIPTION_URL, STRIPE_CUSTOMER_URL, DB_USER_URL, STRIPE_PAYMENT_URL } from '../api/constants';


/** Create a customer in Stripe, return customerID */
export const createCustomer = async (customerDetails) => {
  const { token, name, email, authUserId } = customerDetails;
  const customer = await fetch(STRIPE_CUSTOMER_URL, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      sub: authUserId,
    }),
  });

  return customer.json();
};

export const updatePaymentMethod = async (paymentDetails) => {
  const { token, paymentMethodId, customerId } = paymentDetails;
  const paymentMethod = await fetch(STRIPE_PAYMENT_URL, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      paymentMethodId,
    }),
  });
  return paymentMethod.json();
};

export const createSubscription = async (subscriptionDetails) => {
  const { token, customerId } = subscriptionDetails;
  const priceId = 'price_1Hgbz3HeCPeFIGDDI2RSPHB3';
  const subscription = await fetch(STRIPE_SUBSCRIPTION_URL, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      priceId,
    }),
  });
  return subscription.json();
};

/** Fetch user account from DynamoDB */
export const getUserAccount = async (token, authUserId) => {
  try {
    const userResult = await fetch(`${DB_USER_URL}/${authUserId}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    return userResult.json();
  } catch (err) {
    throw err;
  }
};