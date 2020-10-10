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

const mentorsFields = `
  name,
  'photo': {
    'alt': photo.alt,
    'src': photo.asset->url
  },
  'web': web,
  'calendly': calendly,
  'github': github,
  'linkedin': linkedin,
  'topics': topics,
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

export async function getAllMentors(preview) {
  const data = await getClient(preview).fetch(
    `*[_type == "mentor"] | order(date desc) {
      ${mentorsFields}
    }`,
  );
  return data;
}
