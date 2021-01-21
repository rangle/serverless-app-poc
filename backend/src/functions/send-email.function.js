import AWS from 'aws-sdk';

export const sendEmail = async (req, context) => {
  try {
    // Notify customers with email
    const ses = new AWS.SES();
    const sourceEmail = 'stephaniezeng521@gmail.com';
    const recipientEmailAddress = 'stephanie.zeng@rangle.io';
    const params = {
      Destination: {
        ToAddresses: [recipientEmailAddress],
      },
      Message: {
        Body: {
          Text: {
            Data: `Thanks for purchasing this content. Download the content from helo`,
          },
        },

        Subject: { Data: 'Your content is ready for download!' },
      },
      Source: sourceEmail,
    };

    const sentEmail = await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Success`,
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
