import { FeaturedCards } from '../../lib/types';
import Link from 'next/link';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FeaturedCardsItemProps = {
  card: FeaturedCards;
};

const FeaturedCard: React.FC<FeaturedCardsItemProps> = ({ card }) => {
  return (
    <Link href={card.link}>
      <div className="flex justify-between p-6 transition duration-500 ease-in-out transform scale-100 border-2 border-gray-500 shadow-lg cursor-pointer md:hover:scale-105 rounded-xl">
        <div className="relative flex flex-col items-start justify-between">
          <div className="items-start">
            <h1 className="cards-title">{card.title}</h1>
            <p className="pt-5 pb-8 text-sm text-coolGray-200 lg:text-lg">
              {card.description}
            </p>
          </div>
          <button>
            <a className="flex items-center text-sm font-normal normal-case lg:text-lg text-informational hover:underline">
              {card.btnText}
              <span className="ml-2">
                <FontAwesomeIcon icon={faArrowRight} width="12px" />
              </span>
            </a>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
