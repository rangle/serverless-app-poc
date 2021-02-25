import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();

import { Stripe } from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecret, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2
});
export const saveUser = async (event, context) => {
  // Parse cognito user data from the sns message
  const message = event.Records[0].Sns.Message;
  const { sub, name, email } = JSON.parse(message);

  try {
    // Bind cognito user to stripe customer
    const customer = await stripe.customers.create({
      name,
      email,
      metadata: { cognitoUserId: sub },
    });

    const ddbParams = {
      TableName: 'UsersTable',
      Item: {
        id: sub,
        name,
        email,
        stripeCustomerId: customer.id
      },
    };

    await dynamoDb.put(ddbParams).promise();
    console.log('Save user success');
    return message;
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};
