import styles from './styles.module.css';

import { FeaturedCards } from '../../lib/types';
import Link from 'next/link';

type FeaturedCardsItemProps = {
  card: FeaturedCards;
};

const FeaturedCard: React.FC<FeaturedCardsItemProps> = ({ card }) => {
  return (
    <div
      style={{ backgroundColor: '#090C14' }}
      className={`${styles.card} shadow-lg md:m-18 sm:m-5 mt-10 px-5 py-6 flex justify-between mr-3`}
    >
      <div className="relative flex flex-col justify-center">
        <div
          className="absolute top-0 w-2 h-24 mt-2 mr-4 rounded-sm"
          style={{ backgroundColor: card.color }}
        />
        <div className="pl-5">
          <div className="flex items-center">
            <span
              role="img"
              aria-label="mentorias"
              className="text-xl lg:text-3xl"
            >
              {card.icon}
            </span>
            <h1 className="pl-2 subtitle">{card.title}</h1>
          </div>
          <p className="pt-5 pb-8 text-sm text-gray-200 lg:text-lg">
            {card.description}
          </p>
        </div>
        <button className="pl-5 text-left text-white w-60 h-14">
          <Link href={card.link}>
            <a
              className="text-sm font-normal normal-case btn lg:text-lg"
              style={{ backgroundColor: card.color }}
            >
              {card.btnText}
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default FeaturedCard;
