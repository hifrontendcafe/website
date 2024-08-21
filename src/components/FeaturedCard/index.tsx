import { FeaturedCard as FeaturedCardType } from '@/lib/sanity/featuredCards/getAllFeaturedCards';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const FeaturedCard = ({
  btnText,
  description,
  title,
  link,
}: FeaturedCardType) => {
  return (
    <div className="relative flex max-w-3xl flex-col justify-between rounded-xl border-2 border-zinc-500 p-6 shadow-lg transition duration-300 ease-out hover:border-zinc-50 md:hover:scale-105">
      <div>
        <h3 className="cards-title">{title}</h3>
        <p className="pb-8 pt-5 text-secondary lg:text-lg">{description}</p>
      </div>
      {link && (
        <Link
          href={link}
          className="flex items-center gap-2 text-sm font-normal normal-case text-informational after:absolute after:inset-0 after:content-[''] hover:underline lg:text-lg"
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
