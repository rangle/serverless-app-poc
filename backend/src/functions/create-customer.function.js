import { Stripe } from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecret, {
  apiVersion: '2020-03-02',
});

export const createCustomer = async (req, context) => {
  const { sub, name, email } = JSON.parse(req.body);

  try {
    // Bind cognito user to stripe customer
    const customer = await stripe.customers.create({
      name,
      email,
      metadata: { cognitoUserId: sub },
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: `create customer ${customer.id} success`,
        customerId: customer.id,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Failed to create customer ${err.message}`,
      }),
    };
  }
};
