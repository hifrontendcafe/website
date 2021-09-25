import { Tweet } from './types';

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

const username = 'FrontEndCafe';

const tweetsFromUserUrl = (username: string) =>
  `https://api.twitter.com/2/tweets/search/recent?query=from%3A${username}&expansions=in_reply_to_user_id`;

const tweetEmbedUrl = (username: string, id: string) =>
  `https://publish.twitter.com/oembed?url=https://twitter.com/${username}/status/${id}&omit_script=true`;

function get(url: string) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITTER_API_KEY}`,
    },
  });
}

export const getEmbeddedTweets = async (): Promise<string[]> => {
  const tweets: Tweet[] = await get(tweetsFromUserUrl(username))
    .then((response) => response.json())
    .then((tweets: { data: Tweet[] }) =>
      tweets.data.filter((tweet) => !tweet.in_reply_to_user_id),
    );

  const embeds: Promise<EmbeddedTweet>[] = tweets.map(async ({ id }) =>
    get(tweetEmbedUrl(username, id)).then((response) => response.json()),
  );

  return (await Promise.all(embeds)).map((embed) => embed.html);
};
