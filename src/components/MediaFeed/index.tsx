import { TwitterTimelineEmbed } from 'react-twitter-embed';

const MediaFeed: React.FC = () => {
  return (
    <section id="comunidad" className="relative w-full min-h-screen bg-white">
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
        <div className="flex items-center pb-12 pl-24">
          <img
              className="w-10 h-10"
              src="/icons/twitter.svg"
              alt="twitter-logo"
            />
          <h1 className="pl-2 twitter-blue subtitle">@frontendcafe</h1>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
