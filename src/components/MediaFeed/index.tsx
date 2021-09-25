import { getRandomInt } from '@/lib/helpers';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MediaFeed: React.FC<{ tweets: string[] }> = ({ tweets }) => {
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
    <section id="comunidad" className="relative w-full">
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
          {tweets.map((tweet) => (
            <SkeletonTwitterCard key={tweet} tweet={tweet} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

const SkeletonTwitterCard: React.FC<{ tweet: string }> = ({ tweet }) => {
  return (
    <div
      className="w-full p-4 mx-auto mb-2 text-gray-300 border border-gray-700 rounded-md shadow"
      dangerouslySetInnerHTML={{ __html: tweet }}
    ></div>
  );
};

export default MediaFeed;
