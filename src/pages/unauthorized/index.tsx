import FecHead from '@/components/FecHead';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSettings } from '@/lib/api';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

type IUnauthorized = { preview?: boolean };

const Unauthorized: React.FC<IUnauthorized> = ({ preview }) => {
  return (
    <>
      <FecHead title="No autorizado" />
      <div className="flex flex-col justify-between h-screen bg-zinc-900">
        <Header preview={preview} />
        <div className="flex flex-col items-center ">
          <div className="container flex flex-col justify-center max-w-lg p-4 border border-zinc-500 rounded-lg shadow-xl outline-none bg-zinc-800 focus:outline-none">
            <div className="flex items-center justify-center px-5 py-2 rounded-t">
              <h3 className="text-2xl font-semibold md:text-3xl text-primary">
                <span className="text-red-400">¡Oh no!</span> Todavía no formas
                parte de nuestra comunidad.
              </h3>
            </div>
            <div className="p-6 text-primary">
              Es necesario que te unas a nuestro servidor de Discord para poder
              acceder a esta sección.
            </div>
            <div className="flex items-center justify-end p-2 rounded-b">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white border border-zinc-300 rounded-md shadow-sm text-zinc-700 hover:text-primary hover:bg-zinc-50 "
              >
                Volver al inicio
              </Link>
              <a
                target="_blank"
                className="mx-3 btn btn-secondary"
                style={{ transition: 'all .15s ease' }}
                href="https://discord.gg/frontendcafe"
                rel="noreferrer"
              >
                Sumate a Discord
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings(preview);

  return {
    props: {
      preview,
      settings,
    },
    revalidate: 60,
  };
};

export default Unauthorized;
