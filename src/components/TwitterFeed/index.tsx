import { Tweet } from '../../lib/types';
import TwitterCard from '../TwitterCard';

interface TwitterFeedProps {
  tweets: Tweet[];
}

const chunk = (array: Tweet[], size: number) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

const TwitterFeed: React.FC<TwitterFeedProps> = ({ tweets }) => {
  const dividedFeed = chunk(tweets, 4);

  const generateColumn = (tweets: Tweet[]) =>
    tweets.map((tweet) => <TwitterCard key={tweet.id} id={tweet.id} />);

  return (
    <section
      id="comunidad"
      className="relative w-full bg-primary min-h-screen pb-24"
    >
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
            className="text-primary fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="container px-5 py-16 mx-auto">
        <h1 className="text-4xl pb-12 font-extrabold text-white">
          Comunidad FEC
        </h1>
        <div className="block md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center px-5 lg:px-0">
          <div>{generateColumn(dividedFeed[0])}</div>
          <div>{generateColumn(dividedFeed[1])}</div>
          <div>{generateColumn(dividedFeed[2])}</div>
        </div>
      </div>
    </section>
  );
};

export default TwitterFeed;
