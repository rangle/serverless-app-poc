import AWS from 'aws-sdk';
const sns = new AWS.SNS({ apiVersion: '2012-08-10' });

export const postUserCreation = async (event, context) => {
  console.log('event', event);
  if (!event.request.userAttributes) {
    throw new Error('No new user created from the user pool.');
  }

  const { sub, name, email } = event.request.userAttributes;
  const snsPayload = { sub, name, email };

  const snsParam = {
    Message: JSON.stringify(snsPayload),
    TopicArn: 'arn:aws:sns:us-east-1:242421767634:confirm-user-creation',
  };

  try {
    await sns.publish(snsParam).promise();
    return event;
  } catch (err) {
    console.log('error', err);
    throw err;
  }
};
