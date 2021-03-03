import React from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';
import styles from './styles.module.css';

import { Initiatives } from '../../lib/types';
import InitiativeCard from '../InitiativeCard';

const responsive: ResponsiveType = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

type InitiativesCarouselProps = {
  initiatives: Initiatives[];
};

const InitiativesCarousel: React.FC<InitiativesCarouselProps> = ({
  initiatives,
}) => (
  <Carousel
    swipeable={true}
    draggable={true}
    showDots={false}
    arrows={false}
    responsive={responsive}
    ssr={true}
    infinite={true}
    keyBoardControl={true}
    customTransition="all .3"
    transitionDuration={500}
    containerClass="mt-5 pb-10 carousel-container"
    itemClass="lg:mr-24 mr-5"
    centerMode={false}
  >
    {initiatives.map((initiative) => (
      <InitiativeCard key={initiative.title} initiative={initiative} />
    ))}
  </Carousel>
);

export default InitiativesCarousel;
