import React, { useState } from 'react';
import { GetStaticProps } from 'next';

import { getApprovedReactGroups, getPageByName, getSettings } from '@/lib/api';
import { ReactGroup, Settings, Page } from '../../lib/types';
import { usePreviewSubscription } from '../../lib/sanity';
import { reactGroupQuery } from '../../lib/queries';
import Layout from '../../components/Layout';
import AddParticipantForm from '../../components/Reactivistas/AddParticipantForm';
import GroupInfoModal from '../../components/Reactivistas/GroupInfoModal';
import CreateGroupForm from '../../components/Reactivistas/CreateGroupForm';
import GroupRequirementsModal from '../../components/Reactivistas/GroupRequirementsModal';

import SectionHero from '@/components/SectionHero';

interface ReactGroupPageProps {
  initialReactGroups: ReactGroup[];
  preview: boolean;
  settings: Settings;
  isEnabled: boolean;
  page: Page;
}

const ReactGroupPage: React.FC<ReactGroupPageProps> = ({
  initialReactGroups,
  preview,
  isEnabled,
  page,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: groups } = usePreviewSubscription(reactGroupQuery, {
    initialData: initialReactGroups,
    enabled: preview,
  });

  const [infoModalOpen, setInfoModalOpen] = useState(false);

  return (
    <Layout
      title={page.title}
      description={page.shortDescription}
      metadata={page.metadata}
      preview={preview}
    >
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />
      {isEnabled && (
        <div>
          {groups.length > 0 && (
            <>
              <h1 className="text-2xl font-bold leading-7 text-justify text-primary sm:text-2xl sm:leading-9 sm:truncate ">
                Súmate a los grupos que están comenzando
              </h1>
              <div className="flex flex-wrap m-2 md:m-10 text-primary">
                {groups?.map((group: ReactGroup) => {
                  return (
                    <div
                      key={group.name}
                      className="flex flex-col flex-auto p-5 mx-1 my-5 rounded-md md:mx-5 md:p-10 border-2 border-zinc-500 bg-zinc-900"
                    >
                      <div>
                        <div className="flex items-baseline justify-between ">
                          <h3 className="mb-5 mr-5 text-lg font-medium leading-7 sm:leading-9 sm:truncate">
                            ⚛ {group.name}
                          </h3>
                          <button
                            onClick={() => setInfoModalOpen(true)}
                            className="text-xs font-bold text-blue-600 uppercase focus:outline-none"
                          >
                            + Info
                          </button>
                        </div>
                        <ul className="mb-6">
                          <li key={group.topic} className="mb-1 font-medium">
                            <span className="font-bold">Tema:</span>{' '}
                            {group.topic}
                          </li>
                          <li className="mb-4 font-medium">
                            <span className="font-bold">Fecha de inicio:</span>{' '}
                            {new Date(group.startDate).toLocaleDateString()}
                          </li>
                          <li className="font-medium text-primary">
                            <a
                              href={group.studyMaterial}
                              className="text-informational"
                            >
                              📚 Material de estudio
                            </a>
                          </li>
                        </ul>
                        {group.participants &&
                        group.participants.length >= 10 ? (
                          <div className="text-red-500 font-md text-md">
                            Grupo lleno
                          </div>
                        ) : (
                          <AddParticipantForm group={group} />
                        )}
                      </div>

                      <GroupInfoModal
                        open={infoModalOpen}
                        onClose={() => setInfoModalOpen(false)}
                        group={group}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="flex-1 min-w-0 mb-8">
            <h1 className="text-2xl font-bold leading-7 text-secondary title sm:text-2xl sm:leading-9 sm:truncate">
              Dale vida a un nuevo grupo
            </h1>
            <h2 className="leading-7 text-md text-informational sm:leading-9 sm:truncate">
              <span
                className="cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Ver requisitos
              </span>
            </h2>
          </div>
          <CreateGroupForm />
        </div>
      )}
      <GroupRequirementsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<ReactGroupPageProps> = async ({
  preview = false,
}) => {
  const initialReactGroups = await getApprovedReactGroups(preview);
  const settings = await getSettings(preview);
  const isEnabled = process.env.REACTIVISTAS_ENABLED === 'true';
  const page = await getPageByName(preview, 'Reactivistas');

  return {
    props: {
      initialReactGroups,
      preview,
      settings,
      isEnabled,
      page,
    },
    revalidate: 1,
  };
};

export default ReactGroupPage;
