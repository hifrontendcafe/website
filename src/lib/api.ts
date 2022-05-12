import client, { postClient, previewClient } from './sanity';
import {
  CMYK,
  Post,
  Doc,
  Event,
  Mentor,
  Topic,
  Person,
  FeaturedCards,
  CMYKParticipant,
  Settings,
  Seniority,
  Role,
  Technology,
  Profile,
  SanityEvent,
} from './types';

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
  eventsSettingsQuery,
  futureEventsDiscordIdQuery,
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
  pageQueryByName,
  pagesPathsQuery,
} from './queries';

import { createClient } from 'next-sanity';
import { pageByPathQuery } from './queries';
import { Page, DiscordEvent, EventChannel, EventsSettings } from './types';
import { getAllDiscordEvents } from './discord';
import markdownToHtml from './markdownToHtml';
import Schema from '@sanity/schema';
import blockTools from '@sanity/block-tools';
import jsdom from 'jsdom';
import { createSlug } from './helpers';
import sendEmailJS from './sendEmail';
import { DataEmailJs } from './sendEmail';
const { JSDOM } = jsdom;

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

const defaultSchema = Schema.compile({
  name: 'Event',
  types: [
    {
      type: 'object',
      name: 'event',
      fields: [
        {
          title: 'Description',
          name: 'description',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema
  .get('event')
  .fields.find((field) => field.name === 'description').type;

export function getClient(preview = false): ReturnType<typeof createClient> {
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

async function discordEventToSanityEvent(
  discordEvent: DiscordEvent,
  eventChannel: EventChannel,
): Promise<SanityEvent> {
  const description = await markdownToHtml(discordEvent.description);
  const blocks = blockTools.htmlToBlocks(description, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
  });
  return {
    discordId: discordEvent.id,
    title: discordEvent.name,
    slug: {
      _type: 'slug',
      current: createSlug(discordEvent.name) + '-' + discordEvent.id,
    },
    category: eventChannel.category,
    cover: {
      _type: 'image',
      alt: discordEvent.name,
      asset: {
        _type: 'reference',
        _ref: eventChannel.defaultImage.asset._ref,
      },
    },
    date: discordEvent.scheduled_start_time,
    description: blocks,
    tags: [],
  };
}

export async function importDiscordEventsAutomatic(
  preview = false,
): Promise<boolean> {
  const eventsSettings: EventsSettings = await getClient(true).fetch(
    eventsSettingsQuery,
  );
  if (!eventsSettings.automaticaticMigrationEnabled) {
    return false;
  }
  const newEvents = await importEvents(preview);
  if (newEvents > 0 && eventsSettings.sendEmailsOnMigration) {
    const data: DataEmailJs<Record<string, never>> = {
      service_id: 'fec_gmail',
      template_id: 'events_migration',
      user_id: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      accessToken: process.env.NEXT_PUBLIC_EMAILJS_ACCESS_TOKEN,
    };
    await sendEmailJS<Record<string, never>>(data);
  }
  return true;
}

export async function importEvents(preview = false): Promise<number> {
  const eventChannels = await getClient(preview).fetch(eventChannelsQuery);
  const importedEventsId = await getClient(true).fetch(
    futureEventsDiscordIdQuery,
  );
  let countNewEvents = 0;
  try {
    const response = await getAllDiscordEvents();
    const discordEventsAllValues: DiscordEvent[] = await response.json();
    discordEventsAllValues.forEach(async (discordEvent) => {
      const importedIndex = importedEventsId?.find(
        (event) => event.discordId === discordEvent.id,
      );
      if (importedIndex) return;
      const eventChannel = eventChannels.find(
        (channel) => channel.id === discordEvent.channel_id,
      );
      if (eventChannel) {
        countNewEvents++;
        createEvent(
          await discordEventToSanityEvent(discordEvent, eventChannel),
          true,
        );
      }
    });
  } catch (error) {
    console.error(error);
  }
  return countNewEvents;
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
