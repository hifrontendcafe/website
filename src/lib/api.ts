import client, { postClient, previewClient } from './sanity';
import {
  CMYK,
  Post,
  Doc,
  Event,
  Mentor,
  Topic,
  ReactGroup,
  Person,
  FeaturedCards,
  CMYKParticipant,
  Settings,
} from './types';

import { createSlug } from './helpers';

import {
  postQuery,
  cmykQuery,
  postsQuery,
  mentorsQuery,
  mentorsTopicsQuery,
  docsQuery,
  docQuery,
  eventsQuery,
  eventsQueryByType,
  personQuery,
  reactGroupQuery,
  settingsQuery,
  staffQuery,
  featuredCardsQuery,
} from './queries';

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
  tags,
  recording
`;

export const getClient = (preview: boolean = false) =>
  preview ? previewClient : client;

export async function getAllEvents(preview: boolean = false): Promise<Event[]> {
  return await getClient(preview).fetch(eventsQuery);
}

export async function getSettings(preview: boolean = false): Promise<Settings> {
  return await getClient(preview).fetch(settingsQuery);
}

export async function getEventsByCategory(
  preview: boolean = false,
  categoryFilter: string,
): Promise<Event> {
  return await getClient(preview).fetch(eventsQueryByType, { categoryFilter });
}

export async function getAllAPIEvents(
  preview: boolean = false,
): Promise<Omit<Event, 'description'>> {
  return await getClient(preview).fetch(
    `*[_type == "event"] | order(date desc) {
      ${eventFields}
    }`,
  );
}

export async function getAllMentors(
  preview: boolean = false,
): Promise<Mentor[]> {
  return await getClient(preview).fetch(mentorsQuery);
}

export async function getAllDocs(preview: boolean = false): Promise<Doc[]> {
  return await getClient(preview).fetch(docsQuery);
}

export async function getDocBySlug(
  slug: string,
  preview: boolean = false,
): Promise<Doc> {
  return await getClient(preview).fetch(docQuery, { slug });
}

export async function getMentoringTopics(
  preview: boolean = false,
): Promise<Topic[]> {
  return await getClient(preview).fetch(mentorsTopicsQuery);
}

export async function getAllPosts(preview: boolean = false): Promise<Post[]> {
  return await getClient(preview).fetch(postsQuery);
}

export async function getPost(
  slug: string,
  preview: boolean = false,
): Promise<Post> {
  return await getClient(preview).fetch(postQuery, { slug });
}

export async function getAllPostsSlugs(
  preview: boolean = false,
): Promise<string[]> {
  return await getClient(preview).fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current `,
  );
}

export async function getAllCMYKProjects(
  preview: boolean = false,
): Promise<CMYK[]> {
  return await getClient(preview).fetch(cmykQuery);
}

export async function createCMYKParticipant(
  data: CMYKParticipant,
): Promise<CMYKParticipant> {
  return postClient.create({
    ...data,
    _type: 'cmykParticipant',
  });
}

export async function createReactGroup(data: ReactGroup): Promise<ReactGroup> {
  return await postClient.create({
    ...data,
    _type: 'reactGroup',
    slug: { current: `${createSlug(data.name)}` },
  });
}

export async function addParticipantToReactGroup(
  reactGroupId: string,
  userId: string,
): Promise<Person> {
  return await postClient
    .patch(reactGroupId)
    .setIfMissing({ participants: [] })
    .insert('after', 'participants[-1]', [
      {
        _key: userId,
        _ref: userId,
      },
    ])
    .commit();
}

export async function getApprovedReactGroups(
  preview: boolean = false,
): Promise<ReactGroup[]> {
  return await getClient(preview).fetch(reactGroupQuery);
}

export async function createPerson(data: any): Promise<Person> {
  return await postClient.create({
    ...data,
    _type: 'person',
  });
}

export async function updatePerson(
  personId: string,
  data: any,
): Promise<Person> {
  return await postClient
    .patch(personId)
    .set({
      ...data,
    })
    .commit();
}

export async function getPersonByDiscordId(
  id: string,
  preview: boolean = false,
): Promise<Person> {
  const result = await getClient(preview).fetch(personQuery, { id });
  return result.length > 0 && result[0];
}
export async function getFecTeam(preview: boolean = false): Promise<Person> {
  const result = await getClient(preview).fetch(staffQuery);
  return result.length > 0 && result;
}
export async function getAllFeaturedCards(
  preview: boolean = false,
): Promise<FeaturedCards[]> {
  return await getClient(preview).fetch(featuredCardsQuery);
}
