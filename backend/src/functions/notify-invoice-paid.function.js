import { Stripe } from 'stripe';
import AWS from 'aws-sdk';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

export const notifyInvoicePaid = async (req, context) => {
  try {
    const stripe = new Stripe(stripeSecret, {
      apiVersion: '2020-03-02',
    });
    const event = JSON.parse(req.body);
    let presignedURL;
    if (event.type === 'invoice.paid') {
      // Hard coded parameters for AWS SDK
      const region = 'us-east-1';
      const bucket = 'bite-tut-poc-assets'; //BUCKET_NAME
      const objectKey = 'sample-private-resource.png'; // FILE_NAME
      const signedUrlExpireSeconds = 60 * 60 * 24; //EXPIRATION

      AWS.config.update(region);
      const s3 = new AWS.S3();
      presignedURL = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: objectKey,
        Expires: signedUrlExpireSeconds,
      });

      // Notify customers with email
      const ses = new AWS.SES();
      const sourceEmail = 'stephaniezeng521@gmail.com';
      const recipientEmailAddress = ['stephanie.zeng@rangle.io'];
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
        message: `Invoice is paid! Your pre-signed url is ${presignedURL}`,
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
