import CMYKItemCard from '../../components/CMYKItemCard';
import { GetStaticProps } from 'next';
import { getAllCMYKProjects, getSettings } from '../../lib/api';
import { CMYK } from '../../lib/types';
import Layout from '../../components/Layout';

import { cmykQuery } from '../../lib/queries';
import { usePreviewSubscription } from '../../lib/sanity';
import { useState } from 'react';
import Modal from '@/components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

type CMYKProjectsProps = {
  preview?: boolean;
  data: CMYK[];
};

const CMYKProjects: React.FC<CMYKProjectsProps> = ({
  preview = false,
  data,
}) => {
  const { data: projects } = usePreviewSubscription(cmykQuery, {
    initialData: data,
    enabled: preview,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout title="Proyectos CMYK" preview={preview}>
      <div className="pt-20">
        <div className="px-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-left lg:pl-28">
            <h2 className="mt-2 leading-snug tracking-tight title">
              Proyectos CMYK&nbsp;
              <img
                src="/icons/hearth.svg"
                width="50px"
                className="inline"
                alt="heart"
              />
            </h2>
            <p className="max-w-3xl mt-4 text-lg text-gray-200">
              Desde FrontendCafé impulsamos el desarrollo de proyectos
              colaborativos realizados por miembros de la comunidad con el
              objetivo de ganar experiencia en un entorno profesional. Aquí
              conocerás los diferentes proyectos que los equipos CMYK crearon y
              desarrollaron dentro la comunidad. <br />
            </p>
            <span
              className="flex mt-5 cursor-pointer text-primary"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Conocé más sobre la iniciativa&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} width="16px" />
            </span>
          </div>
        </div>
        <div className="w-full h-full mt-12 md:mt-8">
          <div className="relative z-10 grid max-w-6xl grid-cols-1 gap-6 p-6 mx-auto sm:px-6 lg:px-8 md:grid-cols-2 justify-items-center md:gap-2">
            {projects.map((project, index) => (
              <CMYKItemCard key={project._id} project={project} index={index} />
            ))}
          </div>
          <div className="py-20 text-center">
            <h2 className="mb-8 tracking-tight subtitle">
              El siguiente puede ser el tuyo{' '}
              <img
                src="/icons/hearth.svg"
                className="inline"
                alt="heart"
                width="30px"
              />
            </h2>
            <a
              href="https://discord.gg/frontendcafe"
              className="px-6 py-3 mt-1 btn btn-secondary"
            >
              Súmate a Discord
            </a>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title="Iniciativa CMYK"
        titleClasses="text-primary"
        buttonLabel="Cerrar"
        buttonClasses="text-primary"
      >
        <div className="px-2 overflow-auto text-sm ">
          <ul className="list-none list-inside">
            <li className="mb-1">
              ✔️ La iniciativa CMYK promueve el desarrollo de proyectos
              colaborativos con el objetivo de ganar experiencia en un entorno
              profesional.
            </li>
            <li className="mb-1">
              ✔️ Los participantes tienen acceso a un workshop de Github y
              acompañamiento de nuestro staff quienes estarán disponibles para
              contestar tus dudas y ayudarte para cumplir los objetivos.
            </li>
            <li className="mb-1">
              ✔️ Los proyectos tienen una duración de tres semanas y la próxima
              inscripción será a mediados de 2021.
            </li>
            <li className="mb-1">
              ✔️ La inscripciones se realizan dentro de Discord, si quieres
              participar debes ser miembro de la comunidad y prestar atención a
              los anuncios.
            </li>
            <li>✔️ La actividad es gratuita.</li>
          </ul>
        </div>
      </Modal>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllCMYKProjects(preview);
  const settings = await getSettings(preview);

  return { props: { preview, data, settings }, revalidate: 1 };
};

export default CMYKProjects;
