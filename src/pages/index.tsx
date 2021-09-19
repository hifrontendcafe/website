import React, { useEffect, useState } from 'react';

import { GetStaticProps } from 'next';

import { getAllFeaturedCards } from '../lib/api';

import Hero from '../components/Hero';
import Layout from '../components/Layout';
import MediaFeed from '../components/MediaFeed';

import FeaturedCardsCarousel from '../components/FeaturedCardsCarousel';

//import CMYKBanner from '../components/CMYKBanner';
import JoinSection from '../components/JoinSection';
import AboutSection from '../components/AboutSection';
import { useSettings } from '@/hooks/api';
import { getSettings } from '@/utils/get-layout';
import { getTweetsByUsername } from '@/lib/twitter';
import { Tweet, FeaturedCards } from '@/lib/types';

type IndexProps = {
  preview?: boolean;
  cards: FeaturedCards[];
  tweets: Tweet[];
};

const Index: React.FC<IndexProps> = ({ preview = false, cards, tweets }) => {
  const [counter, setCounter] = useState(0);
  const {
    data: { heroWords = ['Creamos'], description },
  } = useSettings();

  if (counter >= heroWords?.length) {
    setCounter(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title="Home" description={description} preview={preview}>
      {/* <CMYKBanner>Es hoy!</CMYKBanner> */}
      <Hero title={heroWords[counter]} />
      <div className="p-1">
        <AboutSection description={description} />
      </div>
      <Featured cards={cards} />
      <MediaFeed tweets={tweets} />
      <JoinSection />
    </Layout>
  );
};

const Featured = ({ cards }) => (
  <div className="flex flex-col mb-12 md:mb-24">
    <div className="flex flex-col items-center justify-center px-5 m-auto mt-20 text-center lg:w-2/3">
      <h1 className="mb-5 title">¡Descubre lo que tenemos para ti!</h1>
      <p className="w-5/6 text-left lg:text-lg text-md">
        En FrontendCafé con la participación de la comunidad creamos diferentes
        actividades para mejorar nuestras habilidades tanto profesionales como
        comunidad.
      </p>
    </div>
    <FeaturedCardsCarousel featuredCards={cards} />
  </div>
);

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const cards = await getAllFeaturedCards(preview);

  const { dehydratedState } = await getSettings({ preview });

  const { data: tweets } = await getTweetsByUsername('FrontEndCafe');

  return {
    props: { tweets, preview, cards, dehydratedState },
    revalidate: 1,
  };
};

export default Index;
