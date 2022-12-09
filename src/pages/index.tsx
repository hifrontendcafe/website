import React, { forwardRef, useRef } from 'react';

import { GetStaticProps } from 'next';

import { getAllFeaturedCards, getSettings } from '@/lib/api';

import Hero from '../components/Hero';
import Layout from '../components/Layout';
import MediaFeed from '../components/MediaFeed';

import FeaturedCardList from '../components/FeaturedCardList';

//import CMYKBanner from '../components/CMYKBanner';
import { getEmbeddedTweets } from '@/lib/twitter';
import { EmbeddedTweet, FeaturedCards } from '@/lib/types';

import { useSettings } from '@/lib/settings';

type IndexProps = {
  preview?: boolean;
  cards: FeaturedCards[];
  tweets: EmbeddedTweet[];
};

function FeaturedSection({ cards }, ref) {
  return (
    <div ref={ref} className="flex flex-col mb-12 md:mb-24">
      <div className="flex flex-col items-center justify-center m-auto text-center my-28">
        <h1 className="mb-5 subtitle">¡Descubre nuestra comunidad!</h1>
        <p className="text-tertiary lg:text-xl text-md lg:w-2/3">
          Somos una comunidad de personas apasionadas por la tecnología en busca
          de facilitar la inserción laboral y el crecimiento personal a través
          de diferentes iniciativas que promueven la colaboración y el
          intercambio de conocimiento.
        </p>
      </div>
      <FeaturedCardList featuredCards={cards} />
    </div>
  );
}

const ForwardedFeaturedSection = forwardRef(FeaturedSection);

const Index: React.FC<IndexProps> = ({ preview = false, cards, tweets }) => {
  const {
    heroWords = ['Creamos'],
    description,
    heroSubtitle,
    heroDescription,
    discordButtonLabel,
    iniciativasButtonText,
  } = useSettings();

  const featuredRef = useRef<HTMLElement>(null);

  const goToFeaturedSection = () => {
    featuredRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout title="Home" description={description} preview={preview}>
      {/* <CMYKBanner>Es hoy!</CMYKBanner> */}
      <Hero
        heroWords={heroWords}
        subtitle={heroSubtitle}
        description={heroDescription}
        discordButtonLabel={discordButtonLabel}
        iniciativasButtonText={iniciativasButtonText}
        handleIniciativasClick={goToFeaturedSection}
      />
      <ForwardedFeaturedSection ref={featuredRef} cards={cards} />
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
  } catch (error) {
    console.info("Couldn't load tweets", error);
  }

  return {
    props: { tweets, preview, cards, settings },
    revalidate: 1,
  };
};

export default Index;
