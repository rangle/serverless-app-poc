import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2020-03-02' });
export const saveUser = async (event, context) => {
  // Parse cognito user data from the sns message
  const message = event.Records[0].Sns.Message;
  const { sub, name, email } = JSON.parse(message);

  const ddbParams = {
    TableName: 'UsersTable',
    Item: {
      id: sub,
      name,
      email,
    },
  };

  try {
    await dynamoDb.put(ddbParams).promise();
    console.log('Save user success');
    return message;
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};
