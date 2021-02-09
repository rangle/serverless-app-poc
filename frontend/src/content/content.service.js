import { contentfulClient } from './contentful-client';

export const getItems = async (contentType) => {
  const entries = await contentfulClient.getEntries({
    content_type: contentType,
  });

  return entries.items || [];
};

export const getProductDetails = async () => {
  const products = await getItems('product');

  return products.map((product) => product.fields);
};
