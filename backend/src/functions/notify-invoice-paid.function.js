import AWS from 'aws-sdk';

export const notifyInvoicePaid = async (req, context) => {
  try {
    const event = JSON.parse(req.body);
    let presignedURL;
    if (event.type === 'invoice.paid') {
      const { customer_email } = event.data.object;
      // Hard coded parameters for AWS SDK
      const bucket = 'bite-tut-poc-assets'; //BUCKET_NAME
      const objectKey = 'sample-private-resource.png'; // FILE_NAME
      const signedUrlExpireSeconds = 60 * 60 * 24; //EXPIRATION

      const s3 = new AWS.S3();
      presignedURL = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: objectKey,
        Expires: signedUrlExpireSeconds,
      });

      // Notify customers with email
      const ses = new AWS.SES();
      const sourceEmail = 'stephaniezeng521@gmail.com';
      const recipientEmailAddress = [customer_email];
      const params = {
        Destination: {
          ToAddresses: recipientEmailAddress,
        },
        Message: {
          Body: {
            Text: {
              Data: `Thanks for purchasing this content. Download the content from ${presignedURL}`,
            },
          },

          Subject: { Data: 'Your content is ready for download!' },
        },
        Source: sourceEmail,
      };

      await ses.sendEmail(params).promise();
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `success`,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `webhook error ${err.message}`,
      }),
    };
  }
};
