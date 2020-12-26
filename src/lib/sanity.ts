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

export const imageBuilder = sanityImage(client);

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export default client;
