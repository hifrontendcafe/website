import Layout from '../../components/Layout';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { GetStaticProps } from 'next';
import { getSettings } from '@/lib/api';

import CMYKParticipantForm from '../../components/CMYKParticipantForm';
import styles from './styles.module.css';
import { useSettings } from '@/lib/settings';
import { signIn, useSession } from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

type CMYKRegisterPageProps = {
  preview?: boolean;
};

const CMYKRegisterPage: React.FC<CMYKRegisterPageProps> = ({
  preview = false,
}) => {
  const { cmykInscription } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [session, loading] = useSession();

  return (
    <Layout title="CMYK" preview={preview}>
      <div className="flex flex-col items-center px-5 pt-20 md:flex-row">
        <div className="flex flex-col items-center text-center lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start md:text-left">
          <div className="flex flex-col items-center justify-between w-full lg:flex-row">
            <div className="flex flex-col">
              <h1 className="text-5xl font-extrabold text-gray-900 title-font">
                CMYK 4.0
              </h1>
              <h2 className="text-4xl font-medium text-gray-900 title-font">
                Agosto 2021
              </h2>
            </div>
            <button
              className="self-center justify-center px-4 py-2 my-2 font-medium text-white border border-transparent rounded-md shadow-sm lg:self-end text-md bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsModalOpen(true)}
            >
              Conocé el cronograma
            </button>
          </div>
          <div className="mt-8">
            <p className="mb-4 text-lg leading-relaxed">
              Desde <b>FrontendCafé </b> impulsamos el desarrollo de proyectos
              colaborativos realizados por miembros de la comunidad con el
              objetivo de ganar experiencia en un entorno profesional.
            </p>
            <p className="mb-8 text-lg leading-relaxed">
              Al participar tendrás acceso a un workshop de Github y
              acompañamiento de nuestro staff quienes estarán disponibles para
              contestar tus dudas y ayudarte para cumplir los objetivos. La
              actividad se llevará a cabo en agosto 2021 y es <b>gratuita</b>.
            </p>
          </div>
        </div>
        <div className="w-5/6 md:max-w-lg lg:max-w-xl lg:w-full md:w-1/2 md:mb-0 md:pl-10">
          <img
            className={`object-cover object-center rounded ${styles.cmyk3heroimage}`}
            alt="hero"
            src="/img/cmyk-girl.min.svg"
          />
        </div>
      </div>
      {cmykInscription ? (
        <div className="px-5 overflow-hidden bg-white rounded-lg">
          <div className="pt-10 md:pt-15 lg:pt-20 md:py-5 lg:px-24 md:px-16">
            {session && !loading ? (
              <div className="flex flex-col justify-center items-left">
                <h2 className="text-2xl font-bold leading-7 text-black md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                  ¡Es la hora!
                </h2>
                <h2 className="py-1 text-2xl font-bold leading-7 text-black md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                  ¡Participa de los proyectos CMYK! &#x1F396;&#xFE0F;
                </h2>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold leading-7 text-black md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                  ¡Es la hora, inicia sesión para poder inscribirte!
                </h2>
                <button
                  className="flex self-center my-6 btn btn-secondary "
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => signIn('discord')}
                >
                  Iniciar Sesión
                  <FontAwesomeIcon
                    icon={faDiscord}
                    width="15px"
                    className="ml-2"
                  />
                </button>
              </div>
            )}
          </div>
          {session && !loading && <CMYKParticipantForm />}
        </div>
      ) : (
        <div className="bg-white px-7">
          <h1 className="py-10 mx-auto text-xl font-bold leading-7 text-center text-black md:py-20 md:text-2xl lg:text-3xl sm:leading-9 sm:truncate">
            Las inscripciones a CMYK 4.0 se encuentran cerradas (cupo agotado)
          </h1>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title="Cronograma CMYK 4"
        titleClasses="text-primary"
        buttonLabel="Entiendo"
        buttonClasses="text-primary"
      >
        <div className="px-2 overflow-auto text-sm">
          <p className="my-3">
            <span className="font-semibold">19 / 08 / 21</span>&nbsp;&nbsp;
            Apertura de formulario para participantes (Hasta llenar cupo de 25
            personas).
          </p>
          <p className="my-3">
            <span className="font-semibold">23 / 08 / 21</span>&nbsp;&nbsp;
            Reunión de información, selección de grupos y asignación de
            proyectos con coordinadores.
          </p>
          <p className="my-3">
            <span className="font-semibold">27 / 08 / 21</span>&nbsp;&nbsp;
            Reunión de información con participantes y workshop git.
          </p>
          <p className="my-3">
            <span className="font-semibold">30 / 08 / 21</span>&nbsp;&nbsp;
            Inicio oficial de CMYK 4
          </p>
          <p className="my-3">
            <span className="font-semibold">24 / 09 / 21</span>&nbsp;&nbsp;
            Presentación de Proyectos.
          </p>
          <h2 className="my-2 text-base font-semibold">Observaciones</h2>
          <p>
            Los horarios son flexibles, pero el proyecto requiere que tengas
            tiempo disponible para dedicarle al mismo. Te pedimos que te
            inscribas solamente si consideras que tenes el tiempo para asumir el
            compromiso durante las tres semanas que dura el proyecto.
          </p>
        </div>
      </Modal>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings(preview);
  return { props: { preview, settings }, revalidate: 1 };
};

export default CMYKRegisterPage;
