import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EmbeddedTweet } from '@/lib/types';
import Image from 'next/image';

interface TwitterCardProps {
  id: string;
  text: string;
  author: EmbeddedTweet['author'];
  media?: EmbeddedTweet['media'];
  created_at: string;
  referenced_tweets?: EmbeddedTweet['referenced_tweets'];
  with_border?: boolean;
}

interface MediaFeedProps {
  tweets: EmbeddedTweet[];
}

const MediaFeed: React.FC<MediaFeedProps> = ({ tweets }) => {
  const responsive: ResponsiveType = {
    large: {
      breakpoint: { max: 3000, min: 1080 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1080, min: 800 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
    },
  };

  return (
    <section id="media-feed" className="relative w-full">
      <div className="px-5 py-12 mx-auto">
        <a
          href="https://twitter.com/FrontEndCafe/"
          className="flex items-center pb-12 md:pl-2"
        >
          <img
            className="w-6 h-6"
            src="/icons/twitter.svg"
            alt="twitter-logo"
          />
          <h1 className="pl-2 text-xl font-medium twitter-blue subtitle">
            @frontendcafe
          </h1>
        </a>

        <Carousel
          ssr
          infinite
          swipeable
          draggable
          arrows={false}
          keyBoardControl
          showDots={false}
          centerMode={false}
          responsive={responsive}
          transitionDuration={700}
          containerClass="container px-3 md:px-0 py-5 gap-2"
          itemClass="px-2"
          partialVisible={false}
          autoPlay
          autoPlaySpeed={5000}
        >
          {tweets.map(
            ({ id, author, text, media, created_at, referenced_tweets }) => (
              <TwitterCard
                key={id}
                id={id}
                text={text}
                author={author}
                media={media}
                created_at={created_at}
                referenced_tweets={referenced_tweets}
              />
            ),
          )}
        </Carousel>
      </div>
    </section>
  );
};

const TwitterCard: React.FC<TwitterCardProps> = ({
  id,
  text,
  author,
  media,
  referenced_tweets,
  with_border = false,
}) => {
  const tweetUrl = `https://twitter.com/${author.username}/status/${id}`;
  const authorUrl = `https://twitter.com/${author.username}`;
  const quoteTweet =
    referenced_tweets && referenced_tweets.find((t) => t.type === 'quoted');

  const retweet =
    referenced_tweets && referenced_tweets.find((t) => t.type === 'retweeted');

  if (retweet) {
    return (
      <TwitterCard
        key={retweet.id}
        id={retweet.id}
        text={retweet.text}
        author={retweet.author}
        created_at={retweet.created_at}
        media={retweet.media}
      />
    );
  }

  const border = with_border ? 'border border-zinc-500' : '';

  return (
    <div>
      <div
        className={`w-full p-5 mx-auto mb-2 rounded-md text-tertiary bg-zinc-800 ${border}`}
      >
        <div className="flex justify-between">
          <a href={authorUrl} className="flex">
            <Image
              alt={author.username}
              height={48}
              width={48}
              src={author.profile_image_url}
              className="w-12 rounded-full"
            />
            <div className="ml-2">
              <h2 className="font-semibold font-title">{author.name}</h2>
              <h3 className="text-primary0">@{author.username}</h3>
            </div>
          </a>
          <div className="flex mb-auto">
            <FontAwesomeIcon
              icon={faTwitter}
              width="18px"
              className="fill-current text-lightBlue "
            />
            <a href={tweetUrl}>
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                width="18px"
                className="ml-3"
              />
            </a>
          </div>
        </div>
        <div className="my-2">{text}</div>
        <div>
          {media
            ? media.map((img) => (
                <img
                  key={img.url}
                  className="object-cover rounded-md"
                  src={img.url}
                  alt={img.alt_text}
                />
              ))
            : null}
        </div>
        {quoteTweet ? (
          <TwitterCard
            key={quoteTweet.id}
            id={quoteTweet.id}
            text={quoteTweet.text}
            author={quoteTweet.author}
            created_at={quoteTweet.created_at}
            media={quoteTweet.media}
            with_border={true}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MediaFeed;
