import React from 'react';

import 'react-multi-carousel/lib/styles.css';
import { FeaturedCards } from '../../lib/types';

import FeaturedCard from '../FeaturedCard';
import Carousel, { ResponsiveType } from 'react-multi-carousel';

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

type FeaturedCardsCarouselProps = {
  featuredCards: FeaturedCards[];
};

const FeaturedCardsCarousel: React.FC<FeaturedCardsCarouselProps> = ({
  featuredCards,
}) => (
  <Carousel
    ssr
    infinite
    swipeable
    draggable
    arrows={false}
    keyBoardControl
    showDots={false}
    centerMode={true}
    responsive={responsive}
    transitionDuration={700}
    containerClass="carousel-container"
    removeArrowOnDeviceType={['tablet', 'mobile']}
  >
    {featuredCards.map((card) => (
      <FeaturedCard key={card.title} card={card} />
    ))}
  </Carousel>
);

export default FeaturedCardsCarousel;
