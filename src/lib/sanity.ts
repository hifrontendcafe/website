import sanityClient from '@sanity/client';
import sanityImage from '@sanity/image-url';
import {
  createClient,
  createPreviewSubscriptionHook,
  ClientConfig,
} from 'next-sanity';

const config: ClientConfig = {
  dataset: 'playground',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
};

const client = createClient(config);

export const postClient = sanityClient({
  ...config,
  token: process.env.SANITY_TOKEN,
});

export const imageBuilder = sanityImage(client);

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export default client;
