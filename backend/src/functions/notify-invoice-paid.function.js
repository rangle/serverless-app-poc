import { Stripe } from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

export const notifyInvoicePaid = async (req, context) => {
  try {
    const stripe = new Stripe(stripeSecret, {
      apiVersion: '2020-03-02',
    });
    const event = JSON.parse(req.body);
    if (event.type === 'invoice.paid') {
      // step 1. updates on user database
      // step 2. create pre-signed url for private S3 bucket with one month expiry
      console.log(event.data);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `success`,
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `webhook error ${err.message}`,
      }),
    };
  }
};
