import { STRIPE_SUBSCRIPTION_URL } from '../api/constants';

const PaymentService = {
  createSubscription: async (token, paymentMethodId) => {
    const priceId = 'price_1Hgbz3HeCPeFIGDDI2RSPHB3';
    const customerId = 'cus_IHAIpndpVfxujF';
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
