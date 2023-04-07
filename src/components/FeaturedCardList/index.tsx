import FeaturedCard from '../FeaturedCard';
import { FeaturedCards } from '../../lib/types';

type FeaturedCardListProps = {
  featuredCards: FeaturedCards[];
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
