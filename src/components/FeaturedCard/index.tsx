import { FeaturedCards } from '../../lib/types';
import Link from 'next/link';

type FeaturedCardsItemProps = {
  card: FeaturedCards;
};

const FeaturedCard: React.FC<FeaturedCardsItemProps> = ({ card }) => {
  return (
    <div className="flex justify-between p-6 border-2 border-gray-500 shadow-lg rounded-xl">
      <div className="relative flex flex-col items-start justify-between">
        <div className="items-start">
          <h1 className="cards-title">{card.title}</h1>
          <p className="pt-5 pb-8 text-sm text-gray-200 lg:text-lg">
            {card.description}
          </p>
        </div>
        <button>
          <Link href={card.link}>
            <a className="text-sm font-normal normal-case lg:text-lg text-informational hover:underline">
              {card.btnText} →
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default FeaturedCard;
