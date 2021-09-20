import { Tweet } from './types';

function get(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITTER_API_KEY}`,
    },
  });
}

export const getTweetsByUsername = async (
  username: string,
): Promise<{ data: Tweet[] }> => {
  const res = await get(
    `https://api.twitter.com/2/tweets/search/recent?query=from%3A${username}&expansions=in_reply_to_user_id`,
  );

  return await res.json();
};

const username = 'FrontEndCafe';

export const getTweetsByFrontendCafe = (): Promise<{ data: Tweet[] }> => {
  return getTweetsByUsername(username);
};

interface EmbeddedTweet {
  author_name: string;
  author_url: string;
  cache_age: string;
  height: number | null;
  width: number | null;
  html: string;
  provider_name: string;
  provider_url: string;
  type: string;
  url: string;
  version: string;
}

type GetEmbeddedTweet = (id: string) => Promise<EmbeddedTweet>;

export const getEmbeddedTweet: GetEmbeddedTweet = async (id) => {
  const response = await get(
    `https://publish.twitter.com/oembed?url=https://twitter.com/${username}/status/${id}`,
  );

  return await response.json();
};
