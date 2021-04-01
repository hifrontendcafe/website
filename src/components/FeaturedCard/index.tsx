import styles from './styles.module.css';

import { FeaturedCards } from '../../lib/types';
import Link from 'next/link';

type FeaturedCardsItemProps = {
  card: FeaturedCards;
};

const FeaturedCard: React.FC<FeaturedCardsItemProps> = ({ card }) => {
  return (
    <div
      className={`${styles.card} lg:shadow-2xl shadow-xl lg:m-10 md:m-18 sm:m-5 mt-10 px-5 py-10 flex justify-between `}
    >
      <div className="relative">
        <div
          className="rounded-sm w-2 h-24 absolute mt-2 mr-4"
          style={{ backgroundColor: card.color }}
        />
        <div className="px-5">
          <div className="flex items-center">
            <span
              role="img"
              aria-label="mentorias"
              className="lg:text-3xl text-xl"
            >
              {card.icon}
            </span>
            <h1 className="lg:text-4xl text-xl pl-2 font-extrabold">
              {card.title}
            </h1>
          </div>
          <p className="pt-5 pb-8 lg:text-lg text-base	">{card.description}</p>
          <button className="w-60 h-14 text-white">
            <Link href={card.link}>
              <a
                className="btn normal-case lg:text-xl text-base	 font-normal"
                style={{ backgroundColor: card.color }}
              >
                {card.btnText}
              </a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
