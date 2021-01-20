import { Stripe } from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

export const createSubscription = async (req, context) => {
  try {
    const stripe = new Stripe(stripeSecret, {
      apiVersion: '2020-03-02',
    });

    const subscription = await stripe.subscriptions.create({
      customer: 'cus_IHAIpndpVfxujF',
      items: [{ price: 'price_1Hgbz3HeCPeFIGDDI2RSPHB3' }],
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: `create subscription ${subscription.id} success`,
        payload: subscription,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Failed to create subscription ${err.message}`,
      }),
    };
  }
};
