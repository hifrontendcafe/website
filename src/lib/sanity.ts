import sanityClient from '@sanity/client';
import sanityImage from '@sanity/image-url';
import {
  createClient,
  createPreviewSubscriptionHook,
  ClientConfig,
} from 'next-sanity';

const config: ClientConfig = {
  dataset: 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
};

const client = createClient(config);

export const postClient = sanityClient({
  ...config,
  // token:
  //   'skXbel0lAVSXLXmZRMtTwll68SARmyuH3ASgfUpWki3gihVWSDTdgLBqH2Ughq9RoQK9fhw1iVsiFAF5B9JnWVEVendNrpkGX3JcMKlZvqCOvSg6z9i5TSvLpT83oBHT6SyHyYIOR1JwSPvxXeZJJ7YEHm9QSEGcwPXcOWpbsAnBFoEvRvKH',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const imageBuilder = sanityImage(client);

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export default client;
