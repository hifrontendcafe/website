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
      <div className="flex flex-col justify-between h-screen">
        <Header preview={preview} />
        <div className="flex flex-col items-center ">
          <div className="container flex flex-col justify-center max-w-lg p-4 bg-white border rounded-lg shadow-xl outline-none focus:outline-none">
            <div className="flex items-center justify-center px-5 py-2 rounded-t">
              <h3 className="text-2xl font-semibold md:text-3xl">
                <span className="text-red-700">¡Oh no!</span> Todavía no formas
                parte de nuestra comunidad.
              </h3>
            </div>
            <div className="p-6 ">
              Es necesario que te unas a nuestro servidor de Discord para poder
              acceder a esta sección.
            </div>
            <div className="flex items-center justify-end p-2 rounded-b">
              <Link href="/">
                <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:text-primary hover:bg-gray-50 ">
                  Volver al inicio
                </a>
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
    revalidate: 1,
  };
};

export default Unauthorized;
