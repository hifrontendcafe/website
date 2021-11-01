import { Tweets, EmbeddedTweet } from './types';
import { URL } from 'url';

const username = 'FrontEndCafe';

function tweetsFromUserUrl(username: string): string {
  const url = new URL('https://api.twitter.com/2/tweets/search/recent');

  const expansions = [
    'author_id',
    'attachments.media_keys',
    'referenced_tweets.id',
    'referenced_tweets.id.author_id',
  ];

  const fields = [
    'attachments',
    'author_id',
    'public_metrics',
    'created_at',
    'id',
    'in_reply_to_user_id',
    'referenced_tweets',
    'text',
  ];

  const userFields = [
    'id',
    'name',
    'profile_image_url',
    'protected',
    'url',
    'username',
    'verified',
  ];

  const mediaFields = [
    'duration_ms',
    'height',
    'media_key',
    'preview_image_url',
    'type',
    'url',
    'width',
    'public_metrics',
    'alt_text',
  ];

  url.searchParams.set('query', `from:${username}`);
  url.searchParams.set('expansions', expansions.join(','));
  url.searchParams.set('tweet.fields', fields.join(','));
  url.searchParams.set('user.fields', userFields.join(','));
  url.searchParams.set('media.fields', mediaFields.join(','));

  return url.href;
}

function get(url: string) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_API_KEY}`,
    },
  });
}

function getAuthorInfo(author_id: string, tweets: Tweets) {
  return tweets.includes.users.find((user) => user.id === author_id);
}

function getMediaInfo(media_keys: string[], tweets: Tweets) {
  return tweets.includes.media.filter((media) =>
    media_keys.includes(media.media_key),
  );
}

function getReferencedTweets(tweet: Tweets['data'][number], tweets: Tweets) {
  return (
    tweet?.referenced_tweets?.map((referencedTweet) => {
      const fullReferencedTweet = tweets.includes.tweets.find(
        (tweet) => tweet.id === referencedTweet.id,
      );

      return {
        type: referencedTweet.type,
        author: getAuthorInfo(fullReferencedTweet.author_id, tweets),
        ...(fullReferencedTweet?.attachments?.media_keys && {
          media: getMediaInfo(
            fullReferencedTweet.attachments.media_keys,
            tweets,
          ),
        }),
        ...fullReferencedTweet,
      };
    }) || []
  );
}

export const getEmbeddedTweets = async (): Promise<EmbeddedTweet[]> => {
  const response = await get(tweetsFromUserUrl(username));
  const tweets: Tweets = await response.json();

  const tweetsWithoutReplies = tweets.data.filter(
    (tweet) => !tweet.in_reply_to_user_id,
  );

  return tweetsWithoutReplies.map((tweet) => {
    return {
      ...tweet,
      media:
        tweet?.attachments?.media_keys.map((key) =>
          tweets.includes.media.find((media) => media.media_key === key),
        ) || [],
      referenced_tweets: getReferencedTweets(tweet, tweets),
      author: getAuthorInfo(tweet.author_id, tweets),
    };
  }, []);
};
