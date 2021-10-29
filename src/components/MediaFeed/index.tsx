import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <section id="media-feed" className="relative w-full">
      <div className="px-5 py-12 mx-auto">
        <div className="flex items-center pb-12 md:pl-2">
          <img
            className="w-6 h-6"
            src="/icons/twitter.svg"
            alt="twitter-logo"
          />
          <h1 className="pl-2 text-xl font-medium twitter-blue subtitle">
            @frontendcafe
          </h1>
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
          containerClass="container px-3 md:px-0 py-5 gap-2"
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
    <div>
      <div className="w-full p-5 mx-auto mb-2 rounded-md text-coolGray-300 bg-coolGray-900">
        <div className="flex justify-between">
          <div className="flex">
            <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
            <div className="ml-2">
              <h2 className="font-semibold font-title">Marty McFLy</h2>
              <h3 className="text-coolGray-500">@mcfly</h3>
            </div>
          </div>
          <div className="flex mb-auto">
            <FontAwesomeIcon
              icon={faTwitter}
              width="18px"
              className="fill-current text-lightBlue "
            />
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              width="18px"
              className="ml-3"
            />
          </div>
        </div>
        <div className="my-2">
          I think we need a rematch. I don't know, Doc, I guess she felt sorry
          for him cause her did hit him with the car, hit me with the car. Hey,
          hey listen guys. Look, I don't wanna mess with no reefer addicts,
          okay? Crazy drunk drivers. Quiet.
        </div>
        <div>
          <img
            className="object-cover rounded-md"
            src="https://images2-mega.cdn.mdstrm.com/meganoticias/2020/11/16/319144_1_5fb2863ad8781.jpg?d=950x535"
            alt=""
          />
        </div>
      </div>
      <div
        className="w-full p-4 mx-auto mb-2 rounded-md text-coolGray-300 bg-coolGray-900"
        dangerouslySetInnerHTML={{ __html: tweet }}
      ></div>
    </div>
  );
};

export default MediaFeed;
