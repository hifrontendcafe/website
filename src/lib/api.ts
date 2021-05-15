import fs from 'fs';
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
  featuredCardsQuery,
} from './queries';

import { join } from 'path';
import matter from 'gray-matter';

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

export const getClient = (preview = false) =>
  preview ? previewClient : client;

export async function getAllEvents(preview = false): Promise<Event[]> {
  return await getClient(preview).fetch(eventsQuery);
}

export async function getSettings(
  locale: string,
  preview = false,
): Promise<Settings> {
  return await getClient(preview).fetch(settingsQuery, { locale });
}

export async function getEventsByCategory(
  preview = false,
  categoryFilter: string,
): Promise<Event> {
  return await getClient(preview).fetch(eventsQueryByType, { categoryFilter });
}

export async function getAllAPIEvents(
  preview = false,
): Promise<Omit<Event, 'description'>> {
  return await getClient(preview).fetch(
    `*[_type == "event"] | order(date desc) {
      ${eventFields}
    }`,
  );
}

export async function getAllMentors(preview = false): Promise<Mentor[]> {
  return await getClient(preview).fetch(mentorsQuery);
}

export async function getAllDocs(preview = false): Promise<Doc[]> {
  return await getClient(preview).fetch(docsQuery);
}

export async function getDocBySlug(
  slug: string,
  preview = false,
): Promise<Doc> {
  return await getClient(preview).fetch(docQuery, { slug });
}

export async function getMentoringTopics(preview = false): Promise<Topic[]> {
  return await getClient(preview).fetch(mentorsTopicsQuery);
}

export async function getAllPosts(preview = false): Promise<Post[]> {
  return await getClient(preview).fetch(postsQuery);
}

export async function getPost(slug: string, preview = false): Promise<Post> {
  return await getClient(preview).fetch(postQuery, { slug });
}

export async function getAllPostsSlugs(preview = false): Promise<string[]> {
  return await getClient(preview).fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current `,
  );
}

export async function getAllCMYKProjects(preview = false): Promise<CMYK[]> {
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
  preview = false,
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
  preview = false,
): Promise<Person> {
  const result = await getClient(preview).fetch(personQuery, { id });
  return result.length > 0 && result[0];
}

export async function getAllFeaturedCards(
  preview = false,
): Promise<FeaturedCards[]> {
  return await getClient(preview).fetch(featuredCardsQuery);
}

const profilesDirectory = join(process.cwd(), 'src/_profiles');

export function getProfileSlugs() {
  return fs.readdirSync(profilesDirectory);
}

export function getProfileBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(profilesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'role') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllProfiles(fields: string[] = []) {
  const slugs = getProfileSlugs();
  return (
    slugs
      ?.map((slug) => getProfileBySlug(slug, fields))
      // sort profiles by name
      .sort((profile1, profile2) => (profile1.name > profile2.name ? -1 : 1))
  );
}
