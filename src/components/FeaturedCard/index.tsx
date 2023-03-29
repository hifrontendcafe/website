import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { FeaturedCards } from '../../lib/types';

const FeaturedCard = ({ btnText, description, title, link }: FeaturedCards) => {
  return (
    <div className="relative flex flex-col justify-between p-6 transition duration-300 ease-out border-2 border-zinc-500 shadow-lg hover:border-zinc-50 md:hover:scale-105 rounded-xl">
      <div>
        <h3 className="cards-title">{title}</h3>
        <p className="pt-5 pb-8 text-secondary lg:text-lg">{description}</p>
      </div>
      {link && (
        <Link
          href={link}
          className="after:absolute after:inset-0 after:content-[''] flex gap-2 items-center text-sm font-normal normal-case lg:text-lg text-informational hover:underline"
        >
          {btnText}
          <span>
            <FontAwesomeIcon icon={faArrowRight} width="12px" />
          </span>
        </Link>
      )}
    </div>
  );
};

export default FeaturedCard;
