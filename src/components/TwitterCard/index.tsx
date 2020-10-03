import { TwitterTweetEmbed } from 'react-twitter-embed';

interface TwitterCardProps {
  id: string;
}

const TwitterCard: React.FC<TwitterCardProps> = ({ id }) => {
  return (
    <div className="w-full">
      <TwitterTweetEmbed
        tweetId={id}
        placeholder={<SkeletonTwitterCard />}
        options={{
          conversation: 'none',
        }}
      />
    </div>
  );
};

const SkeletonTwitterCard: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mb-2">
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
            <img className="w-6 h-6" src="/icons/twitter.svg" alt="twitter-logo" />
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

export default TwitterCard;
