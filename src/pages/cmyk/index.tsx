import CMYKItemCard from '@/components/CMYKItemCard';
import { GetStaticProps } from 'next';
import { getAllCMYKProjects, getSettings } from '@/lib/api';
import { CMYK } from '@/lib/types';
import Layout from '@/components/Layout';

import { cmykQuery } from '@/lib/queries';
import { usePreviewSubscription } from '@/lib/sanity';
import { useState } from 'react';
import Modal from '@/components/Modal';

import SectionHero from '@/components/SectionHero';

type CMYKProjectsProps = {
  preview?: boolean;
  data: CMYK[];
};

const cmykVersions = [
  { version: 'cmyk-1', name: 'CMYK 1' },
  { version: 'cmyk-2', name: 'CMYK 2' },
  { version: 'cmyk-3', name: 'CMYK 3' },
  { version: 'cmyk-4', name: 'CMYK 4' },
];

const CMYKProjects: React.FC<CMYKProjectsProps> = ({
  preview = false,
  data,
}) => {
  const { data: projects } = usePreviewSubscription(cmykQuery, {
    initialData: data,
    enabled: preview,
  });

  const projectVersions = new Set(
    projects.map((project) => project.cmykVersion),
  );

  const filteredVersions = cmykVersions.filter((cmykVersion) =>
    projectVersions.has(cmykVersion.version),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastVersionIndex = cmykVersions.length - 1;
  const [currentCMYK, setCurrentCMYK] = useState(
    cmykVersions[lastVersionIndex].version,
  );
  const currentProjects = projects.filter(
    (project) => project.cmykVersion === currentCMYK,
  );

  const tabStyle = `py-2 cursor-pointer text-coolGray-300 w-1/3 flex justify-center border-b`;
  const tabStyleActive = `py-2 font-semibold cursor-pointer text-coolGray-100 w-1/3 flex justify-center border-b-4 border-gray-100`;

  return (
    <Layout title="Proyectos CMYK" preview={preview}>
      <SectionHero
        title="Proyectos CMYK"
        paragraph="Proyectos colaborativos realizados por miembros de la comunidad con el
              objetivo de ganar experiencia en un entorno profesional."
        cta="https://frontend.cafe/docs/guia-cmyk"
      />
      <div>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium subtitle">Ediciones</h3>
            <ul className="flex w-full mt-6 mb-16 md:w-8/12">
              {filteredVersions.map((cmykVersion) => (
                <li
                  onClick={() => setCurrentCMYK(cmykVersion.version)}
                  className={
                    cmykVersion.version === currentCMYK
                      ? tabStyleActive
                      : tabStyle
                  }
                  key={cmykVersion.version}
                >
                  {cmykVersion.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full h-full">
            <div className="relative z-10 grid max-w-4xl grid-cols-1 gap-6 p-6 mx-auto sm:px-6 lg:px-12 md:grid-cols-2 justify-items-center md:gap-10">
              {currentProjects.map((project, index) => (
                <CMYKItemCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
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
