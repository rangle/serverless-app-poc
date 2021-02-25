
import { createClient } from 'contentful-management'

const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_KEY,
})
export const updateProduct = async (req, context) => {
  try {
    const event = JSON.parse(req.body);
    if (event.type !== 'price.created') {
      return;
    }
    const { id, lookup_key } = event.data.object;
    const space = await contentfulClient.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');

    let productEntry = await env.getEntry(lookup_key);

    console.log('entry', productEntry, id)


    productEntry.fields.planId['en-US'] = id;

    const updatedProduct = await productEntry.update();
    await updatedProduct.publish();
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
