import blockTools from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import jsdom from 'jsdom';
import { createEvent } from './api';
import { getAllDiscordEvents } from './discord';
import { createSlug } from './helpers';
import markdownToHtml from './markdownToHtml';
import {
  eventChannelsQuery,
  eventsSettingsQuery,
  futureEventsDiscordIdQuery,
} from './queries';
import client, { previewClient } from './sanity';
import sendEmailJS, { DataEmailJs } from './sendEmail';
import {
  DiscordEvent,
  EventChannel,
  EventsSettings,
  SanityEvent,
} from './types';

function getClient(preview = false) {
  return preview ? previewClient : client;
}

const { JSDOM } = jsdom;

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
  .fields.find((field: any) => field.name === 'description').type;

async function discordEventToSanityEvent(
  discordEvent: DiscordEvent,
  eventChannel: EventChannel,
): Promise<SanityEvent> {
  const description = discordEvent.description
    ? await markdownToHtml(discordEvent.description)
    : '';

  const blocks = blockTools.htmlToBlocks(description, blockContentType, {
    parseHtml: (html: string | Buffer | jsdom.BinaryData | undefined) =>
      new JSDOM(html).window.document,
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
    date: discordEvent.scheduled_start_time as unknown as string,
    description: blocks,
    tags: eventChannel.tags,
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

  if (!process.env.NEXT_PUBLIC_EMAILJS_USER_ID) {
    throw new Error('NEXT_PUBLIC_EMAILJS_USER_ID is not set');
  }

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

async function importEvents(preview = false): Promise<number> {
  const eventChannels: EventChannel[] = await getClient(preview).fetch(
    eventChannelsQuery,
  );
  const importedEventsId: SanityEvent[] = await getClient(true).fetch(
    futureEventsDiscordIdQuery,
  );
  let countNewEvents = 0;
  try {
    const discordEventsAllValues = await getAllDiscordEvents();

    discordEventsAllValues.forEach(async (discordEvent) => {
      //
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
