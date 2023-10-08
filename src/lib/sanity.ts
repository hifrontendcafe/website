import createClient from '@sanity/client';
import sanityImage from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: '2022-04-30',
  useCdn: process.env.NODE_ENV === 'production',
};

const client = createClient(config);

export const postClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

export const imageBuilder = sanityImage(client);
export const urlFor = (source: SanityImageSource) => imageBuilder.image(source);
export const imgUrlFrom = (
  image: SanityImageSource | null | undefined,
  {
    size,
    width = 512,
    height = 512,
  }: { size?: number; width?: number; height?: number },
) => {
  if (!image) return null;
  return urlFor(image)
    .width(size || width)
    .height(size || height)
    .url();
};

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

export default client;
