import styles from './styles.module.css';

import { FeaturedCards } from '../../lib/types';
import Link from 'next/link';

type FeaturedCardsItemProps = {
  card: FeaturedCards;
};

const FeaturedCard: React.FC<FeaturedCardsItemProps> = ({ card }) => {
  return (
    <div
      className={`${styles.card} items-stretch shadow-lg border-2 border-gray-500 md:m-18 sm:m-5 mt-10 px-5 py-6 flex justify-between mr-3`}
    >
      <div className="relative flex flex-col items-start justify-between">
        <div className="items-start">
          <h1 className="cards-title">{card.title}</h1>
          <p className="pt-5 pb-8 text-sm text-gray-200 lg:text-lg">
            {card.description}
          </p>
        </div>
        <button className="text-left text-gray-50 w-60 h-14">
          <Link href={card.link}>
            <a className="text-sm font-normal normal-case lg:text-lg text-informational hover:underline">
              {card.btnText}
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default FeaturedCard;
