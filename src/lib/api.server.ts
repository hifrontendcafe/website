import { cache } from 'react';
import {
  cmykQuery,
  docQuery,
  docsQuery,
  eventsQuery,
  featuredCardsQuery,
  mentorsQuery,
  mentorsTopicsQuery,
  pageByPathQuery,
  pageQueryByName,
  postQuery,
  postsQuery,
  profileQuery,
  settingsQuery,
  staffQuery,
} from './queries';
import client from './sanity';
import type {
  Doc,
  FeaturedCards,
  Page,
  Post,
  Settings,
  Event,
  Person,
  CMYK,
  Profile,
  Topic,
  Mentor,
} from './types';

const clientFetch = cache<typeof client['fetch']>(client.fetch.bind(client));

export async function getSettings(): Promise<Settings> {
  return await clientFetch(settingsQuery);
}

export async function getAllPosts(): Promise<Post[]> {
  return await clientFetch(postsQuery);
}

export async function getPageByPath(path: string): Promise<Page> {
  return await clientFetch(pageByPathQuery, { path });
}

export async function getAllFeaturedCards(): Promise<FeaturedCards[]> {
  return await clientFetch(featuredCardsQuery);
}

export async function getPost(slug: string): Promise<Post> {
  return await clientFetch(postQuery, { slug });
}

export async function getAllPostsSlugs(): Promise<string[]> {
  return await clientFetch(
    `*[_type == "post" && defined(slug.current)][].slug.current `,
  );
}

export async function getAllDocs(): Promise<Doc[]> {
  return await clientFetch(docsQuery);
}

export async function getDocBySlug(slug: string): Promise<Doc> {
  return await clientFetch(docQuery, { slug });
}

export async function getPageByName(name: string): Promise<Page> {
  return await clientFetch(pageQueryByName, { name });
}

export async function getAllEvents(): Promise<Event[]> {
  return await clientFetch(eventsQuery);
}

export async function getFecTeam(): Promise<Person[]> {
  const result = await clientFetch(staffQuery);
  return result.length > 0 && result;
}

export async function getAllCMYKProjects(): Promise<CMYK[]> {
  return await clientFetch(cmykQuery);
}

export async function getProfile(id: string): Promise<Profile> {
  return await clientFetch(profileQuery, { id });
}

export async function getMentoringTopics(): Promise<Topic[]> {
  return await clientFetch(mentorsTopicsQuery);
}

export async function getAllMentors(): Promise<Mentor[]> {
  return await clientFetch(mentorsQuery);
}
