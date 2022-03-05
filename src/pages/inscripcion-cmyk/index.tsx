import Layout from '../../components/Layout';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { GetStaticProps } from 'next';
import { getSettings } from '@/lib/api';

import CMYKParticipantForm from '../../components/CMYKParticipantForm';
import { useSettings } from '@/lib/settings';
import { signIn, useSession } from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import SectionHero from '@/components/SectionHero';

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
      <SectionHero
        title="CMYK 4.0"
        paragraph="Agosto 2021"
        cta="https://frontend.cafe/docs/guia-cmyk"
      />
      <div className="flex flex-col-reverse items-center md:flex-row">
        <div className="flex text-center lg:grow md:w-1/2  md:text-left">
          <div className="mt-8 text-gray-200">
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
            <button
              className="inline-flex justify-center btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Conocé el cronograma
            </button>
          </div>
        </div>
        <div className="md:w-1/2 lg:w-full md:max-w-lg lg:max-w-xl md:mb-0 md:pl-10">
          <img
            className={`object-cover object-center rounded `}
            alt="hero"
            src="/img/cmyk-girl.min.svg"
          />
        </div>
      </div>
      {cmykInscription ? (
        <div className="overflow-hidden  rounded-lg">
          <div className="pt-10 md:pt-15 lg:pt-20 md:py-5">
            {session && !loading ? (
              <div className="flex flex-col justify-center items-left">
                <h2 className="text-2xl font-bold leading-7 text-gray-200 md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                  ¡Es la hora!
                </h2>
                <h2 className="py-1 text-2xl font-bold leading-7 text-gray-200 md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                  ¡Participa de los proyectos CMYK! &#x1F396;&#xFE0F;
                </h2>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold leading-7 text-gray-200 md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                  ¡Es la hora, inicia sesión para poder inscribirte!
                </h2>
                <button
                  className="flex self-center my-6 btn btn-secondary "
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => signIn('discord')}
                >
                  Iniciar sesión
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
        <div
          className="rounded-lg overflow-hidden mx-auto inset-x-0 flex justify-center items-center 
                   bg-blue-500 text-primary text-sm font-bold px-4 py-3 my-6"
        >
          <p className="mx-auto text-lg font-bold text-center text-gray-200 sm:leading-9 sm:truncate">
            Las inscripciones a CMYK 4.0 se encuentran cerradas
          </p>
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
        <div className="px-2 overflow-auto text-sm text-gray-300">
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
