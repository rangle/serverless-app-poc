import { STRIPE_SUBSCRIPTION_URL, STRIPE_CUSTOMER_URL } from '../api/constants';

const PaymentService = {
  // Create a customer in Stripe, return customerID
  createCustomer: async (createCustomerOptions) => {
    const { token, name, email, sub } = createCustomerOptions;
    const customer = await fetch(STRIPE_CUSTOMER_URL, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        sub,
      }),
    });

    return customer.json();
  },
  createSubscription: async (createSubscriptionOptions) => {
    const { token, paymentMethodId, customerId } = createSubscriptionOptions;
    const priceId = 'price_1Hgbz3HeCPeFIGDDI2RSPHB3';
    const subscription = await fetch(STRIPE_SUBSCRIPTION_URL, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        paymentMethodId,
        priceId,
      }),
    });
    return subscription.json();
  },
};

export default PaymentService;
