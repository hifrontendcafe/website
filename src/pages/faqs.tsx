import { getLayout } from '@/utils/get-layout';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';

type FAQSProps = {
  preview?: boolean;
};

const Faqs: React.FC<FAQSProps> = ({ preview = false }) => {
  return (
    <div>
      <Layout title="FAQS" preview={preview}>
        <section className="text-gray-700">
          <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium  mb-4 text-primary">
                Preguntas frecuentes
              </h1>
            </div>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              <div className="w-full lg:w-1/2 px-4 py-2">
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    ¿Qué es FrontendCafé?
                  </summary>

                  <span>
                    Somos una comunidad de personas interesadas en tecnología y
                    ciencias informáticas en donde charlamos sobre lenguajes de
                    programación, diseño web, infraestructura, compartimos
                    dudas, preguntamos y respondemos.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold bg-gray-200 rounded-md py-2 px-4">
                    ¿Qué es el coworking?
                  </summary>
                  Durante el momento que estés trabajando puedes entrar a este
                  canal y compartir un ambiente de música y chat con usuarios
                  del server. En este canal están deshabilitados los micrófonos
                  por defecto para poder trabajar sin interrupciones.
                  <span></span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    ¿Qué es el pair-programming / programar a la par?
                  </summary>

                  <span>
                    Similar al coworking, usamos pair-programming cuando
                    queremos trabajar pero compartiendo palabras con otros
                    colegas, incluso, poder trabajar sobre el mismo proyecto con
                    otros usuarios del servidor.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    ¿Cómo son los eventos de inglés?
                  </summary>
                  <span>
                    Nos reunimos a charlar con el objetivo de perder el miedo a
                    hablar en inglés en público, mejorar la comunicación en
                    inglés partiendo desde el propio nivel, divertirnos, y
                    conectarnos. Puedes mirar cuando serán los próximos eventos
                    en nuestra{' '}
                    <a href="https://frontend.cafe/eventos"> agenda</a>
                  </span>
                </details>
              </div>
              <div className="w-full lg:w-1/2 px-4 py-2">
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    ¿Cuándo son los eventos de inglés?{' '}
                  </summary>
                  <span>
                    Los eventos de inglés son los días martes a las 18 hs y
                    jueves a las 19.30 hs Argentina (GTM-3)
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    ¿Qué nivel hay que tener para participar en los eventos de
                    inglés?
                  </summary>
                  <span>
                    No es necesario ningún nivel. Solo tener ganas de
                    participar. Es muy importante que puedas abrir el micrófono
                    y te animes a hablar.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    ¿Qué son las mentorías?
                  </summary>
                  <span>
                    El programa de mentorías de FrontendCafé busca servirte de
                    guía en este camino de la tecnología, conectándote con
                    profesionales y referentes capacitados en los múltiples y
                    diversos temas que engloba el universo de las tecnologías de
                    la información.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    ¿Cómo me anoto a la mentorías?
                  </summary>
                  <span>
                    Puedes hacerlo directamente en{' '}
                    <a href="https://frontend.cafe/mentorias">
                      la página de mentorías
                    </a>
                    , ahí coordinarás fecha y hora según los calendarios de los
                    mentores disponibles.
                  </span>
                </details>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { dehydratedState } = await getLayout({ preview });

  return { props: { preview, dehydratedState }, revalidate: 1 };
};

export default Faqs;
