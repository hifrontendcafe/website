import client, { previewClient } from './sanity';

const eventFields = `
  title,
  'slug': slug.current,
  'category': {
    'name': category->name,
  },
  'cover': {
    'alt': cover.alt,
    'src': cover.asset->url
  },
  date,
  description,
  tags,
  recording
`;

const getClient = (preview) => (preview ? previewClient : client);

export async function getAllEvents(preview) {
  const data = await getClient(preview).fetch(
    `*[_type == "event"] | order(date desc) {
      ${eventFields}
    }`,
  );

  return data;
}
