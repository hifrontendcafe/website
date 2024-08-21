import { type FeaturedCard as FeaturedCardType } from '@/lib/sanity/featuredCards/getAllFeaturedCards';
import FeaturedCard from '../FeaturedCard';

type FeaturedCardListProps = {
  featuredCards: FeaturedCardType[];
};

const FeaturedCardList: React.FC<FeaturedCardListProps> = ({
  featuredCards,
}) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {featuredCards?.map((card) => (
        <FeaturedCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default FeaturedCardList;
