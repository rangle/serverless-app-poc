import { Stripe } from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecret, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2
});

export const updatePaymentMethod = async (req, context) => {
  const { paymentMethodId, customerId } = JSON.parse(req.body);

  try {
    // Set the default payment method on the customer
    let paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: `update payment method success`,
        last4: paymentMethod.last4,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Failed to update payment method - ${err.message}`,
      }),
    };
  }
};
