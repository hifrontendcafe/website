import sanityClient from '@sanity/client';
import sanityImage from '@sanity/image-url';
import { createClient, ClientConfig } from 'next-sanity';

const config: ClientConfig = {
  dataset: process.env.SANITY_CALOMENTOR_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_CALOMENTOR_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
};

const calomentorClient = createClient(config);

export const postClient = sanityClient({
  ...config,
  token: process.env.SANITY_CALOMENTOR_TOKEN,
});

export const imageBuilder = sanityImage(calomentorClient);

export default calomentorClient;
