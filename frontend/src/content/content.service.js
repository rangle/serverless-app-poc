import { contentfulClient } from './contentful-client';

const ContentService = {
  getItems: async (contentType) => {
    const entries = await contentfulClient.getEntries({
      content_type: contentType,
    });

    return entries.items || [];
  },

  getProductDetails: async () => {
    const products = await ContentService.getItems('product');

    return products.map((product) => product.fields);
  },
};

export default ContentService;
