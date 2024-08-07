import * as queries from './queries';

import type {
  CMYK,
  Doc,
  Event,
  FeaturedCards,
  Mentor,
  Page,
  Person,
  Profile,
  Role,
  Seniority,
  Technology,
  Topic,
} from './types';

import SanityClient from 'next-sanity-client';
import { config } from './sanity';

export const client = new SanityClient({
  ...config,
  queries,
});

export const getPageByPath = client.createApiUtil<Page, { path: string }>(
  'pageByPathQuery',
);

export const getAllFeaturedCards =
  client.createApiUtil<FeaturedCards[]>('featuredCardsQuery');

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

export const getAllCMYKVersionsOrderedFromLatest = client.createApiUtil<string>(
  'cmykVersionsOrderedFromLatestQuery',
);

export const getProfile = client.createApiUtil<Profile, { id: string }>(
  'profileQuery',
);
// FIXME: Mentor>topics type
type TMentor = Omit<Mentor, 'topics'> & { topics: Topic[] };
export const getMentor = client.createApiUtil<TMentor | null, { id: string }>(
  'mentorQuery',
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
