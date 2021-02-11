import { DocumentClient } from 'aws-sdk/clients/dynamodb';
const dynamoDb = new DocumentClient();
export const updateUser = async (req, context) => {
  const { sub, updateKey, updateValue } = JSON.parse(req.body);

  const ddbParams = {
    TableName: 'UsersTable',
    Key: {
      id: sub,
    },
    UpdateExpression: `set ${updateKey} = :updateValue`,
    ExpressionAttributeValues: {
      ':updateValue': updateValue,
    },
  };

  try {
    const user = await dynamoDb.update(ddbParams).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: `update user success`,
        payload: user,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Failed to update user ${err.message}`,
      }),
    };
  }
};