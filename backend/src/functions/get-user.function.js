import { DocumentClient } from 'aws-sdk/clients/dynamodb';
const dynamoDb = new DocumentClient();
export const getUser = async (req, context) => {
  const { sub } = req.pathParameters;
  const ddbParams = {
    TableName: 'UsersTable',
    Key: {
      id: sub,
    },
  };

  try {
    const userItem = await dynamoDb.get(ddbParams).promise();
    const user = userItem.Item;

    console.log('get user success', user);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: `fetch user success`,
        payload: user,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Failed to fetch user ${err.message}`,
      }),
    };
  }
};