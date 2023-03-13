import * as queries from './queries';

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
  Seniority,
  Technology,
  Role,
} from './types';

import { config } from './sanity';
import SanityClient from 'next-sanity-client';

const client = new SanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  useCdn: false,
  apiVersion: '2023-03-12',
  queries,
});

export const getSettings = client.createApiUtil<Settings>('settingsQuery');

export const getAllPosts = client.createApiUtil<Post[]>('postsQuery');

export const getPageByPath = client.createApiUtil<Page, { path: string }>(
  'pageByPathQuery',
);

export const getAllFeaturedCards =
  client.createApiUtil<FeaturedCards[]>('featuredCardsQuery');

export const getPost = client.createApiUtil<Post, { slug: string }>(
  'postQuery',
);

export const getAllPostsSlugs = client.createApiUtil<string[]>(
  `*[_type == "post" && defined(slug.current)][].slug.current`,
);

export const getAllDocs = client.createApiUtil<Doc[]>('docsQuery');

export const getDocBySlug = client.createApiUtil<
  Doc | undefined,
  { slug: string }
>('docQuery');

export const getPageByName = client.createApiUtil<Page, { name: string }>(
  'pageQueryByName',
  {
    next: {
      revalidate: 120,
    },
  },
);

export const getAllEvents = client.createApiUtil<Event[]>('eventsQuery');

export const getFecTeam = client.createApiUtil<Person[]>('staffQuery');

export const getAllCMYKProjects = client.createApiUtil<CMYK[]>('cmykQuery');

export const getProfile = client.createApiUtil<Profile, { id: string }>(
  'profileQuery',
);

export const getMentoringTopics =
  client.createApiUtil<Topic[]>('mentorsTopicsQuery');

export const getAllMentors = client.createApiUtil<Mentor[]>('mentorsQuery');

export const getAllProfiles = client.createApiUtil<Profile[]>('profilesQuery');

export const getAllSeniorities =
  client.createApiUtil<Seniority[]>('senioritiesQuery');

export const getAllTechnologies =
  client.createApiUtil<Technology[]>('technologiesQuery');

export const getAllRoles = client.createApiUtil<Role[]>('rolesQuery');
