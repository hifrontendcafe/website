import { forwardRef, MouseEventHandler } from 'react';
import { FeaturedCards } from '../../lib/types';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FeaturedCardsItemProps = {
  card: FeaturedCards;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function handleClick(router: NextRouter, link: string) {
  router.push(link);
}

const Card = ({ card, href, onClick }: FeaturedCardsItemProps, ref) => {
  const router = useRouter();

  return (
    <div
      onClick={() => handleClick(router, card.link)}
      className="flex justify-between p-6 transition duration-500 ease-in-out transform scale-100 border-2 shadow-lg cursor-pointer border-coolGray-500 hover:border-coolGray-50 md:hover:scale-105 rounded-xl"
    >
      <div className="relative flex flex-col items-start justify-between">
        <div className="items-start">
          <h1 className="cards-title">{card.title}</h1>
          <p className="pt-5 pb-8 text-coolGray-200 lg:text-lg">
            {card.description}
          </p>
        </div>
        <button>
          <a
            ref={ref}
            href={href}
            onClick={onClick}
            className="flex items-center text-sm font-normal normal-case lg:text-lg text-informational hover:underline"
          >
            {card.btnText}
            <span className="ml-2">
              <FontAwesomeIcon icon={faArrowRight} width="12px" />
            </span>
          </a>
        </button>
      </div>
    </div>
  );
};

const ForwardedCard = forwardRef(Card);

const FeaturedCard: React.FC<FeaturedCardsItemProps> = ({ card }) => {
  return (
    <Link href={card.link} passHref>
      <ForwardedCard card={card}></ForwardedCard>
    </Link>
  );
};

export default FeaturedCard;
