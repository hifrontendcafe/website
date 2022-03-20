const urlBaseAPIDiscord = 'https://discord.com/api';
const urlBaseCDNDiscord = 'https://cdn.discordapp.com/';
const urlversionAPIDiscord = '/v9';

export const urlAPIDiscordEvents =
  urlBaseAPIDiscord +
  urlversionAPIDiscord +
  '/guilds/594363964499165194/scheduled-events';

function get(url: string) {
  const token = process.env.DISCORD_TOKEN;
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${token}`,
    },
  });
}

export function getAllDiscordEvents(): Promise<Response> {
  return get(urlAPIDiscordEvents);
}

export function getDiscordEventImageUrl(
  eventId: string,
  image: string,
  size = 512,
): string {
  return `${urlBaseCDNDiscord}guild-events/${eventId}/${image}.png?size=${size}`;
}
