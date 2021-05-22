import { TwitterTweetEmbed } from 'react-twitter-embed';
import { CustomButtonGroup } from '../FeaturedCardsCarousel/CustomArrows';
import { getRandomInt } from '@/lib/helpers';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Tweet } from 'lib/types';

const MediaFeed: React.FC<{ tweets: Tweet[] }> = ({ tweets }) => {
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
    <section id="comunidad" className="relative w-full bg-white">
      <div
        className="absolute top-0 left-0 right-0 bottom-auto w-full -mt-20 overflow-hidden pointer-events-none"
        style={{ height: '80px', transform: 'translateZ(0)' }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-white fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="container px-5 py-12 mx-auto">
        <div className="flex items-center pb-12 md:pl-24">
          <img
            className="w-10 h-10"
            src="/icons/twitter.svg"
            alt="twitter-logo"
          />
          <h1 className="pl-2 twitter-blue subtitle">@frontendcafe</h1>
        </div>

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
          containerClass="container px-3 md:px-0 mx-auto py-5 gap-2"
          itemClass="px-2"
          partialVisible={false}
          autoPlay
          autoPlaySpeed={5000}
        >
          {tweets
            .filter((x) => !x.in_reply_to_user_id)
            .map((tweet) => (
              <TwitterTweetEmbed
                key={tweet.id}
                tweetId={tweet.id}
                options={{
                  maxHeight: 500,
                }}
                placeholder={<SkeletonTwitterCard />}
              />
            ))}
        </Carousel>
      </div>
    </section>
  );
};

const SkeletonTwitterCard: React.FC = () => {
  return (
    <div className="w-full p-4 mx-auto mb-2 bg-white border border-gray-300 rounded-md shadow">
      <div className="flex space-x-4 animate-pulse">
        <div className="flex-1 py-1 space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center w-3/4">
              <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
              <div className="w-40 ml-2">
                <div className="h-4 mb-2 bg-gray-400 rounded"></div>
                <div className="h-3 bg-gray-400 rounded"></div>
              </div>
            </div>
            <img
              className="w-6 h-6"
              src="/icons/twitter.svg"
              alt="twitter-logo"
            />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
          </div>
          <div className="space-y-2">
            <div
              style={{ height: getRandomInt(200, 500) }}
              className="bg-gray-400 rounded"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaFeed;
