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
  Seniority,
  Role,
  Technology,
  Profile,
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
  eventChannelsQuery,
  reactGroupQuery,
  settingsQuery,
  staffQuery,
  featuredCardsQuery,
  personQueryByDiscordID,
  technologiesQuery,
  senioritiesQuery,
  rolesQuery,
  profilesQuery,
  profileQuery,
  personQuery,
  pageQueryByHero,
} from './queries';

import { createClient } from 'next-sanity';
import { Page, DiscordEvent, EventChannel } from './types';
import { getAllDiscordEvents, getDiscordEventImageUrl } from './discord';

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

export function getClient(preview = false): ReturnType<typeof createClient> {
  return preview ? previewClient : client;
}

function discordEventToEvent(
  discordEvent: DiscordEvent,
  channelEvent: EventChannel,
): Event {
  return {
    origin: 'Discord',
    title: discordEvent.name,
    slug: createSlug(discordEvent.name),
    category: {
      name: channelEvent.category,
    },
    cover: {
      src: discordEvent.image
        ? getDiscordEventImageUrl(discordEvent.id, discordEvent.image)
        : channelEvent.defaultImage,
    },
    date: discordEvent.scheduled_start_time,
    description: discordEvent.description,
  };
}

async function getDiscordEvents(preview = false): Promise<Event[]> {
  const eventChannels = await getClient(preview).fetch(eventChannelsQuery);
  let discordEvents = [];
  try {
    const response = await getAllDiscordEvents();
    const discordEventsAllValues: DiscordEvent[] = await response.json();
    discordEvents = discordEventsAllValues
      .filter(
        (event) =>
          eventChannels.findIndex(
            (channel) => channel.id === event.channel_id,
          ) !== -1,
      )
      .map((event) => {
        const channelEvent = eventChannels.find(
          (eventChannel) => eventChannel.id === event.channel_id,
        );
        return discordEventToEvent(event, channelEvent);
      });
  } catch (error) {
    console.log(error);
  }
  return discordEvents;
}

export async function getAllEvents(preview = false): Promise<Event[]> {
  const sanityEvents = await getClient(preview).fetch(eventsQuery);
  const discordEvents = await getDiscordEvents(preview);
  return [...sanityEvents, ...discordEvents];
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

export async function getPageByHero(
  preview = false,
  hero: string,
): Promise<Page> {
  return await getClient(preview).fetch(pageQueryByHero, { hero });
}
