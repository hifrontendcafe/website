import client, { postClient, previewClient } from './sanity';
import {
  CMYK,
  CMYKParticipant,
  Doc,
  Event,
  FeaturedCards,
  Mentor,
  Person,
  Profile,
  Role,
  SanityEvent,
  Seniority,
  Settings,
  Technology,
  Topic,
} from './types';

import {
  cmykQuery,
  docQuery,
  docsQuery,
  eventsQuery,
  eventsQueryByType,
  featuredCardsQuery,
  mentorsQuery,
  mentorsTopicsQuery,
  pageQueryByName,
  pagesPathsQuery,
  personQuery,
  personQueryByDiscordID,
  profileQuery,
  profilesQuery,
  rolesQuery,
  senioritiesQuery,
  settingsQuery,
  staffQuery,
  technologiesQuery,
} from './queries';

import { pageByPathQuery } from './queries';
import { Page } from './types';

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

export function getClient(preview = false) {
  return preview ? previewClient : client;
}

export async function createEvent(
  data: SanityEvent,
  draft = false,
): Promise<SanityEvent> {
  if (draft)
    return postClient.create({
      _type: 'event',
      _id: 'drafts.',
      ...data,
    });
  else
    return postClient.create({
      _type: 'event',
      ...data,
    });
}

export async function getAllEvents(preview = false): Promise<Event[]> {
  return await getClient(preview).fetch(eventsQuery);
}

export async function getSettings(preview = false): Promise<Settings> {
  return await getClient(preview).fetch(settingsQuery);
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

export async function createPerson(data: any): Promise<Person> {
  return await postClient.create({
    ...data,
    _type: 'person',
  });
}

export async function updatePerson(
  personId: string,
  data: Partial<Person>,
): Promise<Person> {
  return await postClient
    .patch(personId)
    .set({ ...data })
    .commit();
}

export async function getPersonByDiscordID(
  id: string,
  preview = false,
): Promise<Person> {
  const result = await getClient(preview).fetch(personQueryByDiscordID, { id });
  return result.length > 0 && result[0];
}

export async function getFecTeam(preview = false): Promise<Person> {
  const result = await getClient(preview).fetch(staffQuery);
  return result.length > 0 && result;
}

export async function getAllFeaturedCards(
  preview = false,
): Promise<FeaturedCards[]> {
  return await getClient(preview).fetch(featuredCardsQuery);
}

export async function getAllTechnologies(
  preview = false,
): Promise<Technology[]> {
  return await getClient(preview).fetch(technologiesQuery);
}

export async function getAllSeniorities(preview = false): Promise<Seniority[]> {
  return await getClient(preview).fetch(senioritiesQuery);
}

export async function getAllRoles(preview = false): Promise<Role[]> {
  return await getClient(preview).fetch(rolesQuery);
}

export async function getAllProfiles(preview = false): Promise<Profile[]> {
  return await getClient(preview).fetch(profilesQuery);
}

export async function getProfile(
  id: string,
  preview = false,
): Promise<Profile> {
  return await getClient(preview).fetch(profileQuery, { id });
}

export async function getPerson(
  id: string,
  preview = false,
): Promise<Profile['person']> {
  return await getClient(preview).fetch(personQuery, { id });
}

export async function getPageByName(
  preview = false,
  name: string,
): Promise<Page> {
  return await getClient(preview).fetch(pageQueryByName, { name });
}

export async function getPagesPaths(preview = false): Promise<string[]> {
  return await getClient(preview).fetch(pagesPathsQuery);
}

export async function getPageByPath(
  path: string,
  preview = false,
): Promise<Page> {
  return await getClient(preview).fetch(pageByPathQuery, { path });
}
