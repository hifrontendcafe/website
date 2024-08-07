import { FrontendCafeId } from './constants';
import type { DiscordEvent } from './types';

const urlBaseAPIDiscord = 'https://discord.com/api';
const urlversionAPIDiscord = '/v9';

const urlAPIDiscordEvents =
  urlBaseAPIDiscord +
  urlversionAPIDiscord +
  `/guilds/${FrontendCafeId}/scheduled-events`;

function get(url: string) {
  const token = process.env.DISCORD_TOKEN;
  return fetch(url, {
    next: { revalidate: 300 },
    method: 'GET',
    headers: {
      Authorization: `Bot ${token}`,
    },
  });
}

export function getAllDiscordEvents(): Promise<DiscordEvent[]> {
  return get(urlAPIDiscordEvents).then((events) =>
    events.ok ? events.json() : [],
  );
}
