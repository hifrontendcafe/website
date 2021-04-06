import { TwitterTimelineEmbed } from 'react-twitter-embed';

const MediaFeed: React.FC = () => {
  return (
    <section id="comunidad" className="relative w-full bg-white min-h-screen">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
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
        <h1 className="text-3xl md:text-4xl pb-12 font-extrabold title-primary">
          Comunidad FEC
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TwitterTimelineEmbed
            sourceType="url"
            url="https://twitter.com/frontendcafe"
            options={{ height: 1000, tweetLimit: 2 }}
            placeholder={<SkeletonTwitterCard />}
            noHeader
            transparent
            borderColor="#00c39d"
            noScrollbar
          />
          <TwitterTimelineEmbed
            sourceType="url"
            url="https://twitter.com/frontendcafe/likes"
            options={{ height: 1000, tweetLimit: 2 }}
            placeholder={<SkeletonTwitterCard />}
            noHeader
            transparent
            borderColor="#00c39d"
            noScrollbar
          />
        </div>
      </div>
    </section>
  );
};

const SkeletonTwitterCard: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 shadow rounded-md p-4 w-full mx-auto mb-2">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="flex justify-between">
            <div className="flex w-3/4 items-center">
              <div className="rounded-full bg-gray-400 h-12 w-12"></div>
              <div className="ml-2 w-40">
                <div className="mb-2 h-4 bg-gray-400 rounded"></div>
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
            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
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
