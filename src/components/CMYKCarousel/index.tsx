import React from 'react';
import Carousel, { ResponsiveType, DotProps } from 'react-multi-carousel';
import Link from 'next/link';

import 'react-multi-carousel/lib/styles.css';

import { CMYK } from '../../lib/types';
import CMYKItem from '../CMYKItem';

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

type CMYKCarouselProps = {
  projects: CMYK[];
};

const CMYKCarousel: React.FC<CMYKCarouselProps> = ({ projects }) => (
  <>
    <h1 className="absolute ml-12 font-bold mt-10 z-20 text-white text-3xl">
      CMYK
    </h1>

    <FecLogo />
    <Carousel
      containerClass="flex min-h-screen min-w-screen"
      itemClass="min-h-screen min-w-screen"
      ssr
      showDots
      arrows={false}
      draggable
      swipeable
      autoPlay
      infinite
      customDot={<CustomDot />}
      responsive={responsive}
    >
      {projects.map((project) => (
        <CMYKItem key={project._id} project={project} />
      ))}
    </Carousel>
  </>
);

const FecLogo: React.FC = () => (
  <Link href="/">
    <a className="absolute right-0 mt-6 mr-16 z-20">
      <img
        src="/logo.svg"
        className="w-16 h-16 p-2 rounded-full"
        alt="Logo FrontendCafe"
      />
    </a>
  </Link>
);

const CustomDot: React.FC<DotProps> = ({ onClick, active }) => (
  <span
    className={
      active
        ? 'bg-white mx-1 cursor-pointer shadow-sm rounded-md mb-5 z-20 w-2 h-2'
        : 'bg-white opacity-25 cursor-pointer shadow-sm mx-1 mb-5 rounded-md z-20 w-2 h-2'
    }
    onClick={onClick}
  ></span>
);

export default CMYKCarousel;
