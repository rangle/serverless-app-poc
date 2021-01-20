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
      // step 1. updates on user database
      // step 2. create pre-signed url for private S3 bucket with one month expiry

      // Hard coded parameters for AWS SDK
      const region = 'us-east-1';
      const bucket = 'bite-tut-poc-assets'; //BUCKET_NAME
      const objectKey = 'sample-private-resource.png'; // FILE_NAME
      const signedUrlExpireSeconds = 60 * 5; //EXPIRATION

      AWS.config.update(region);
      const s3 = new AWS.S3();
      presignedURL = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: objectKey,
        Expires: signedUrlExpireSeconds,
      });
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
