import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import MediaFeed from '../components/MediaFeed';
import { getSettings } from '../lib/api';
import { Settings } from '../lib/types';

interface IndexProps {
  preview?: boolean;
  settings?: Settings;
}

const Index: React.FC<IndexProps> = ({ preview = false, settings }) => {
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
      <Featured />
      <MediaFeed />
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
  </section>
);

const Featured = () => {
  return (
    <section id="ingles" className="relative py-48 bg-purple-900">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style={{ height: '80px', transform: 'translateZ(0)' }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-purple-900 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="items-center flex flex-wrap">
          <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
            <Image
              alt="..."
              className="max-w-full rounded-lg shadow-md mb-10"
              src="/img/english.png"
              loading="lazy"
              unsized
            />
          </div>
          <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div className="md:pr-12">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                Prácticas de inglés
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-200">
                Nos reunimos a charlar con el objetivo de perder el miedo a
                hablar en inglés en público, mejorar la comunicación en inglés
                partiendo desde el propio nivel, divertirnos, y conectarnos.
                Podes mirar cuando serán los próximos eventos en nuestra agenda
              </p>
              <ul className="mt-6 text-white">
                <li>• Son encuentros online gratis</li>
                <li>• No necesitas inscribirte</li>
                <li>• Sucede dentro nuestro canal de Discord</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings();
  return { props: { preview, settings } };
};

export default Index;
