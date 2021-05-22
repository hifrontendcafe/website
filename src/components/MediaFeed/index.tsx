import { TwitterTweetEmbed } from 'react-twitter-embed';
import { CustomButtonGroup } from '../FeaturedCardsCarousel/CustomArrows';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import { useQuery } from 'react-query';
import 'react-multi-carousel/lib/styles.css';

const MediaFeed: React.FC = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      cookie:
        'personalization_id=%22v1_C6%2Ft5si8LCJ3Mh%2B5i99d9g%3D%3D%22; guest_id=v1%253A162171521495786396',
      Authorization:
        'Bearer AAAAAAAAAAAAAAAAAAAAACoSIAEAAAAApKQoLnjk5HO4dligCv7j5gP2CRI%3DfwdXLoAWjd42JbuhMEQZE6kVtjh7i2B6NUlu2ftVSmCVmDiSZb',
    },
  };

  const { data } = useQuery(
    'twitterQuery',
    () =>
      fetch(
        'https://api.twitter.com/2/tweets/search/recent?query=from%3AFrontEndCafe',
        requestOptions,
      ).then((res) => res.json()),
    { retry: 0, retryDelay: 5000, refetchOnWindowFocus: false },
  );

  console.log('🚀 ~ data', data);

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

        {data && (
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
            renderButtonGroupOutside={true}
            customButtonGroup={<CustomButtonGroup />}
            partialVisible={false}
          >
            {data?.data.map((tweet) => (
              <TwitterTweetEmbed
                key={tweet.id}
                tweetId={tweet.id}
                placeholder={<SkeletonTwitterCard />}
              />
            ))}
          </Carousel>
        )}
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
            <div className="h-48 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaFeed;
