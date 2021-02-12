import client, { postClient, previewClient } from './sanity';
import { CMYK, Post, Doc, Event, Mentor, Topic, Initiative } from './types';
import {
  postQuery,
  cmykQuery,
  postsQuery,
  mentorsQuery,
  mentorsTopicsQuery,
  docsQuery,
  docQuery,
  eventsQuery,
} from './querys';

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

const getClient = (preview: boolean = false) =>
  preview ? previewClient : client;

export async function getAllEvents(preview: boolean = false): Promise<Event[]> {
  return await getClient(preview).fetch(eventsQuery);
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

export async function postInitiative(data: Initiative): Promise<any> {
  return await postClient.create(data);
}
