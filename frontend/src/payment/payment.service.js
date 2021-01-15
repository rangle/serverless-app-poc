import { STRIPE_SUBSCRIPTION_URL } from '../api/constants';

const PaymentService = {
  createSubscription: async () => {
    const subscription = await fetch(STRIPE_SUBSCRIPTION_URL, {
      method: 'POST',
    });
    return subscription.json();
  },
};

export default PaymentService;
