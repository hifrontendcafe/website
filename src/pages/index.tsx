import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { GetStaticProps } from 'next';

import { getAllFeaturedCards } from '../lib/api';

import Hero from '../components/Hero';
import Layout from '../components/Layout';
import MediaFeed from '../components/MediaFeed';
import { getSettings } from '../lib/api';
import { Settings } from '../lib/types';

interface IndexProps {
  preview?: boolean;
  settings?: Settings;
  cards: object;
}

import FeaturedCardsCarousel from '../components/FeaturedCardsCarousel';

//import CMYKBanner from '../components/CMYKBanner';
import JoinSection from '../components/JoinSection';
import AboutSection from '../components/AboutSection';

const Index: React.FC<IndexProps> = ({ preview = false, settings, cards }) => {
  const [counter, setCounter] = useState(0);

  if (counter >= settings?.heroWords.length) {
    setCounter(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
      title="Home"
      description={settings?.description}
      settings={settings}
      preview={preview}
    >
      {/* <CMYKBanner>Es hoy!</CMYKBanner> */}
      <Hero
        background={settings?.heroBackground}
        title={settings?.heroWords[counter]}
      />

      <div className="bg-indigo-100 p-1">
        <AboutSection description={settings?.description} />
      </div>
      <Featured cards={cards} />
      <MediaFeed />
      <JoinSection />
    </Layout>
  );
};

const Featured = ({ cards }) => (
  <div className="flex flex-col mb-12">
    <div className="flex flex-col justify-center m-auto mt-20 items-center  text-center lg:w-2/3">
      <h1 className="lg:text-5xl md:text-4xl text-xl font-extrabold mb-5">
        ¡Descubre lo que tenemos para ti!
      </h1>
      <p className="lg:text-lg text-md w-5/6">
        En Frontendcafé con la participación de la comunidad creamos diferentes
        actividades para mejorar nuestras habilidades tanto profesionales como
        comunidad.
      </p>
    </div>
    |
    <FeaturedCardsCarousel featuredCards={cards} />
  </div>
);

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings();
  const cards = await getAllFeaturedCards(preview);
  return { props: { preview, settings, cards }, revalidate: 1 };
};

export default Index;
