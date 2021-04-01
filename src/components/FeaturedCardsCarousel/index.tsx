import React from 'react';
import 'react-multi-carousel/lib/styles.css';

import FeaturedCard from '../FeaturedCard';
import { FeaturedCards } from '../../lib/types';
import { CustomButtonGroup } from './CustomArrows';

import Carousel, { ResponsiveType } from 'react-multi-carousel';

const responsive: ResponsiveType = {
  large: {
    breakpoint: { max: 3000, min: 720 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 1,
  },
};

type FeaturedCardsCarouselProps = {
  featuredCards: FeaturedCards[];
};

const FeaturedCardsCarousel: React.FC<FeaturedCardsCarouselProps> = ({
  featuredCards,
}) => {
  return (
    <>
      <Carousel
        ssr
        infinite
        swipeable
        draggable
        arrows={false}
        keyBoardControl
        showDots={false}
        centerMode={false}
        responsive={responsive}
        transitionDuration={700}
        containerClass="w-11/12 md:container mx-auto py-5"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        renderButtonGroupOutside={true}
        customButtonGroup={<CustomButtonGroup />}
      >
        {featuredCards?.map((card) => (
          <FeaturedCard key={card.title} card={card} />
        ))}
      </Carousel>
      <div></div>
    </>
  );
};

export default FeaturedCardsCarousel;
