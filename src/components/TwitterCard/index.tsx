import { TwitterTweetEmbed } from 'react-twitter-embed';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
    <div className="overflow-hidden py-2 px-4my-1">
      <Skeleton style={{ borderRadius: '1rem' }} height={300} width="100%" />
    </div>
  );
};

export default TwitterCard;
