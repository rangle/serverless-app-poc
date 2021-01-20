import { STRIPE_SUBSCRIPTION_URL } from '../api/constants';

const PaymentService = {
  createSubscription: async (token) => {
    const subscription = await fetch(STRIPE_SUBSCRIPTION_URL, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return subscription.json();
  },
};

export default PaymentService;
