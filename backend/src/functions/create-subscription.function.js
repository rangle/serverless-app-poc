import { Stripe } from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecret, {
  apiVersion: '2020-03-02',
});

export const createSubscription = async (req, context) => {
  const { customerId, priceId } = JSON.parse(req.body);

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
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
