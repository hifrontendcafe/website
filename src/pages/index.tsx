import React, { useEffect, useState } from 'react';

import { GetStaticProps } from 'next';

import { getAllFeaturedCards, getSettings } from '@/lib/api';

import Hero from '../components/Hero';
import Layout from '../components/Layout';
import MediaFeed from '../components/MediaFeed';

import FeaturedCardsCarousel from '../components/FeaturedCardsCarousel';

//import CMYKBanner from '../components/CMYKBanner';
import { getEmbeddedTweets } from '@/lib/twitter';
import { FeaturedCards } from '@/lib/types';

import { useSettings } from '@/lib/settings';

type IndexProps = {
  preview?: boolean;
  cards: FeaturedCards[];
  tweets: string[];
};

function Featured({ cards }) {
  return (
    <div className="flex flex-col mb-12 md:mb-24">
      <div className="flex flex-col items-center justify-center m-auto mt-20 text-center lg:w-2/3">
        <h1 className="mb-5 title">¡Descubre lo que tenemos para ti!</h1>
        <p className="text-gray-300 lg:text-lg text-md">
          En FrontendCafé con la participación de la comunidad creamos
          diferentes actividades para mejorar nuestras habilidades tanto
          profesionales como comunidad.
        </p>
      </div>
      <FeaturedCardsCarousel featuredCards={cards} />
    </div>
  );
}

const Index: React.FC<IndexProps> = ({ preview = false, cards, tweets }) => {
  const [counter, setCounter] = useState(0);
  const { heroWords = ['Creamos'], description } = useSettings();

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
      <Featured cards={cards} />
      <MediaFeed tweets={tweets} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const cards = await getAllFeaturedCards(preview);
  const settings = await getSettings(preview);

  let tweets = [];
  try {
    tweets = await getEmbeddedTweets();
  } catch {
    console.info("Couldn't load tweets");
  }

  return {
    props: { tweets, preview, cards, settings },
    revalidate: 1,
  };
};

export default Index;
