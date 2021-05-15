import Layout from '../../components/Layout';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { GetStaticProps } from 'next';
import { getLayout } from '@/utils/get-layout';

import CMYKParticipantForm from '../../components/CMYKParticipantForm';
import styles from './styles.module.css';
import { useSettings } from '@/hooks/api';

type CMYKRegisterPageProps = {
  preview?: boolean;
};

const CMYKRegisterPage: React.FC<CMYKRegisterPageProps> = ({
  preview = false,
}) => {
  const {
    data: { cmykInscription },
  } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout title="CMYK" preview={preview}>
      <div
        className="container mx-auto flex px-5 pt-20 md:flex-row flex-col
        items-center"
      >
        <div
          className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col
          md:items-start md:text-left items-center text-center"
        >
          <div className="flex flex-col lg:flex-row w-full justify-between items-center">
            <div className="flex flex-col">
              <h1 className="title-font text-5xl font-extrabold text-gray-900">
                CMYK 3.0
              </h1>
              <h2
                className="title-font text-4xl font-medium
                text-gray-900"
              >
                Abril 2021
              </h2>
            </div>
            <button
              className="justify-center px-6 py-2 mt-6 text-lg font-medium text-white border border-transparent rounded-md shadow-sm bg-primary
              hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsModalOpen(true)}
            >
              Conocé el cronograma
            </button>
          </div>
          <div className="mt-12">
            <p className="mb-4 leading-relaxed text-lg">
              Desde <b>FrontendCafé </b> impulsamos el desarrollo de proyectos
              colaborativos realizados por miembros de la comunidad con el
              objetivo de ganar experiencia en un entorno profesional.
            </p>
            <p className="mb-8 leading-relaxed text-lg">
              Al participar tendrás acceso a un workshop de Github y
              acompañamiento de nuestro staff quienes estarán disponibles para
              contestar tus dudas y ayudarte para cumplir los objetivos. La
              actividad se llevará a cabo en abril 2021 y es <b>gratuita</b>.
            </p>
          </div>
        </div>
        <div className="md:max-w-lg lg:max-w-xl lg:w-full md:w-1/2 w-5/6 md:mb-0 md:pl-10">
          <img
            className={`object-cover object-center rounded ${styles.cmyk3heroimage}`}
            alt="hero"
            src="/img/Happy_Bunch_-_Walking_1.svg"
          />
        </div>
      </div>
      {cmykInscription ? (
        <div className="container mx-auto overflow-hidden bg-white rounded-lg px-5">
          <div className="pt-10 md:pt-15 lg:pt-20 md:py-5 lg:px-24 md:px-16">
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="font-bold leading-7 text-black text-2xl md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                  ¡Es la hora!
                </h1>
                <h1 className="font-bold leading-7 text-black text-2xl md:text-3xl lg:text-4xl  sm:leading-9 sm:truncate py-1">
                  ¡Participa de los proyectos CMYK! &#x1F396;&#xFE0F;
                </h1>
              </div>
            </div>
          </div>
          <CMYKParticipantForm />
        </div>
      ) : (
        <div className="container mx-auto bg-white px-7">
          <h1 className="font-bold leading-7 text-black text-2xl md:pl-20 py-10 md:py-20 md:text-3xl lg:text-4xl sm:leading-9 sm:truncate text-center">
            La inscripción se encuentra cerrada.
          </h1>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title="Cronograma CMYK 3"
        titleClasses="text-primary"
        buttonLabel="Entiendo"
        buttonClasses="text-primary"
      >
        <div className="text-sm overflow-auto px-2 ">
          <p className="my-3">
            <span className="font-semibold">05 / 04 / 21</span>&nbsp;&nbsp;
            Apertura de formulario para participantes (Hasta llenar cupo de 20
            personas).
          </p>
          <p className="my-3">
            <span className="font-semibold">08 / 04 / 21</span>&nbsp;&nbsp;
            Reunión de información, selección de grupos y asignación de
            proyectos con coordinadores.
          </p>
          <p className="my-3">
            <span className="font-semibold">09 / 04 / 21</span>&nbsp;&nbsp;
            Reunión de información con participantes y workshop git.
          </p>
          <p className="my-3">
            <span className="font-semibold">12 / 04 / 21</span>&nbsp;&nbsp;
            Inicio oficial de CMYK 3
          </p>
          <p className="my-3">
            <span className="font-semibold">03 / 05 / 21</span>&nbsp;&nbsp;
            Presentación de Proyectos.
          </p>
          <h2 className="text-base my-2 font-semibold">Observaciones</h2>
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
  const { dehydratedState } = await getLayout({ preview });
  return { props: { preview, dehydratedState }, revalidate: 1 };
};

export default CMYKRegisterPage;
