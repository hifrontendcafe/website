import { Tweet } from './types';

export const getTweetsByUsername = async (
  username: string,
): Promise<{ data: Tweet[] }> => {
  const res = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=from%3A${username}&expansions=in_reply_to_user_id`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITTER_API_KEY}`,
      },
    },
  );
  return await res.json();
};
