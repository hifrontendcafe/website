import client, { postClient, previewClient } from './sanity';
import { SanityEvent } from './types';

import { personQuery, personQueryByDiscordID } from './queries';
import { Event } from './sanity/event/getAllEvents';
import { CMYKParticipant, Person } from './sanity/person/getFecTeam';
import { Profile } from './sanity/profile/getProfile';

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

function getClient(preview = false) {
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

export async function getAllAPIEvents(
  preview = false,
): Promise<Omit<Event, 'description'>> {
  return await getClient(preview).fetch(
    `*[_type == "event"] | order(date desc) {
      ${eventFields}
    }`,
  );
}

export async function createCMYKParticipant(
  data: CMYKParticipant,
): Promise<CMYKParticipant> {
  return postClient.create({
    ...data,
    _type: 'cmykParticipant',
  });
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

export async function getPerson(
  id: string,
  preview = false,
): Promise<Profile['person']> {
  return await getClient(preview).fetch(personQuery, { id });
}
