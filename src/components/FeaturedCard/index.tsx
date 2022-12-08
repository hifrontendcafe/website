import { forwardRef, MouseEventHandler, useCallback } from 'react';
import { FeaturedCards } from '../../lib/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FeaturedCardsItemProps = {
  card: FeaturedCards;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const Card = ({ card, href, onClick }: FeaturedCardsItemProps, ref) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (!card.link) return;

    router.push(card.link);
  }, [card.link, router]);

  return (
    <div
      onClick={handleClick}
      className="flex justify-between p-6 transition duration-500 ease-in-out scale-100 border-2 border-zinc-500 shadow-lg cursor-pointer hover:border-zinc-50 md:hover:scale-105 rounded-xl"
    >
      <div className="relative flex flex-col items-start justify-between">
        <div className="items-start">
          <h1 className="cards-title">{card.title}</h1>
          <p className="pt-5 pb-8 text-secondary lg:text-lg">
            {card.description}
          </p>
        </div>
        {card.link && (
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
        )}
      </div>
    </div>
  );
};

const ForwardedCard = forwardRef(Card);

const FeaturedCard: React.FC<FeaturedCardsItemProps> = ({ card }) => {
  if (card.link) {
    return (
      <Link href={card.link} passHref legacyBehavior>
        <ForwardedCard card={card} />
      </Link>
    );
  }

  return <ForwardedCard card={card} />;
};

export default FeaturedCard;
