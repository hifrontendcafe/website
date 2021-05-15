import React, { useEffect, useState } from 'react';

import { GetStaticProps } from 'next';

import { getAllFeaturedCards } from '../lib/api';

import Hero from '../components/Hero';
import Layout from '../components/Layout';
import MediaFeed from '../components/MediaFeed';
import useTranslation from 'next-translate/useTranslation';
import FeaturedCardsCarousel from '../components/FeaturedCardsCarousel';
//import CMYKBanner from '../components/CMYKBanner';
import JoinSection from '../components/JoinSection';
import AboutSection from '../components/AboutSection';
import { useSettings } from '@/hooks/api';
import { getLayout } from '@/utils/get-layout';

type IndexProps = {
  preview?: boolean;
  cards: [];
};

const Index: React.FC<IndexProps> = ({ preview = false, cards }) => {
  const [counter, setCounter] = useState(0);
  const {
    data: { heroWords = ['Creamos'], description },
  } = useSettings();
  const { t } = useTranslation('home');

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
    <Layout title={t('title')} description={description} preview={preview}>
      {/* <CMYKBanner>Es hoy!</CMYKBanner> */}
      <Hero title={heroWords[counter]} />
      <div className="p-1">
        <AboutSection description={description} />
      </div>
      <Featured cards={cards} />
      <MediaFeed />
      <JoinSection />
    </Layout>
  );
};

const Featured = ({ cards }) => {
  const { t } = useTranslation('home');

  return (
    <div className="flex flex-col mb-12 md:mb-24">
      <div className="flex flex-col items-center justify-center m-auto mt-20 text-center lg:w-2/3 px-5">
        <h1 className="mb-5 title">{t('featured.title')}</h1>
        <p className="w-5/6 lg:text-lg text-md text-left">
          {t('featured.description')}
        </p>
      </div>
      <FeaturedCardsCarousel featuredCards={cards} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  locale,
}) => {
  const cards = await getAllFeaturedCards(preview);

  const { dehydratedState } = await getLayout({ preview, locale });

  return {
    props: { preview, cards, dehydratedState },
    revalidate: 1,
  };
};

export default Index;
