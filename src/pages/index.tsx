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

  if (counter >= settings.heroWords.length) {
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
      description={settings.description}
      settings={settings}
      preview={preview}
    >
      {/* <CMYKBanner>Es hoy!</CMYKBanner> */}
      <Hero
        background={settings.heroBackground}
        title={settings.heroWords[counter]}
      />

      <Services />
      <Featured cards={cards} />
      <MediaFeed />
      <JoinSection />
    </Layout>
  );
};

// Page Sections
const Services = () => (
  <section className="pb-20 pt-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap items-center mt-24 mb-12">
        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mb-16">
          <h3 className="text-3xl md:text-4xl mb-2 font-bold leading-normal text-primary">
            ¿Quienes somos?
          </h3>
          <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
            Somos una comunidad de personas interesadas en tecnología y ciencias
            informáticas en donde charlamos sobre lenguajes de programación,
            diseño web, infraestructura, compartimos dudas, preguntamos y
            respondemos.
          </p>
          <p className="text-lg font-light leading-relaxed mt-0 mb-12  text-gray-700">
            Todo pasa adentro de un canal de Discord...
          </p>
          <Link href="/docs/manual-de-uso-de-fec">
            <a
              className="btn btn-secondary"
              style={{ transition: 'all .15s ease' }}
            >
              Manual de uso de FEC
            </a>
          </Link>
        </div>

        <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
          <iframe
            className="w-full md:max-w-sm lg:min-w-0 sm:min-w-full"
            src="https://discordapp.com/widget?id=594363964499165194&theme=dark"
            height="400"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
    </div>
    <AboutSection />
  </section>
);

const Featured = ({ cards }) => (
  <div className="flex flex-col mb-24">
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
    {<FeaturedCardsCarousel featuredCards={cards} />}
  </div>
);

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings();
  const cards = await getAllFeaturedCards(preview);
  return { props: { preview, settings, cards }, revalidate: 1 };
};

export default Index;
