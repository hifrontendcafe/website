import React, { useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getApprovedReactGroups } from '../../lib/api';
import { ReactGroup } from '../../lib/types';
import { usePreviewSubscription } from '../../lib/sanity';
import { reactGroupQuery } from '../../lib/queries';
import Layout from '../../components/Layout';
import AddParticipantForm from '../../components/reactivistas/AddParticipantForm';
import GroupInfoModal from '../../components/reactivistas/GroupInfoModal';
import CreateGroupForm from '../../components/reactivistas/CreateGroupForm';
import GroupRequirementsModal from '../../components/reactivistas/GroupRequirementsModal';

import { getLayout } from '@/utils/get-layout';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReactGroupPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> =
  ({ data, preview }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: groups } = usePreviewSubscription(reactGroupQuery, {
      initialData: data,
      enabled: preview,
    });

    const [infoModalOpen, setInfoModalOpen] = useState(false);

    return (
      <Layout title="Iniciativas">
        <div className="pt-20">
          <div className="px-6 mx-auto max-w-7xl sm:px-6 lg:px-36">
            <div className="text-left sm:px-10 xl:px-0">
              <h2 className="mt-2 leading-snug tracking-tight title">
                Reactivistas&nbsp;
              </h2>
              <p className="max-w-3xl mt-4 text-lg">
                Reactivistas es una iniciativa que promueve el estudio de React
                en grupos auto-organizados por integrantes de la comunidad.
                <br />
                Si participas podrás intercambiar ideas con tus pares y acceder
                a las Office Hours, que son reuniones con nuestro staff exponer
                tus dudas y realizar consultas.
              </p>
              <span className="flex mt-5 cursor-pointer text-primary">
                <a
                  target="_blank"
                  href="https://frontend.cafe/docs/guia-reactivistas"
                  rel="noreferrer"
                >
                  Conocé más sobre la iniciativa&nbsp;
                </a>
                <FontAwesomeIcon icon={faExternalLinkAlt} width="16px" />
              </span>
            </div>
          </div>
        </div>

        <div className="container p-6 m-10 mx-auto lg:px-36">
          {groups.length > 0 && (
            <>
              <h1 className="text-2xl font-bold leading-7 text-justify text-black sm:text-2xl sm:leading-9 sm:truncate ">
                Súmate a los grupos que están comenzando
              </h1>
              <div className="flex flex-wrap m-2 md:m-10">
                {groups?.map((group: ReactGroup) => {
                  return (
                    <div
                      key={group.name}
                      className="flex flex-col flex-auto p-5 mx-1 my-5 rounded-md shadow-lg md:mx-5 md:p-10"
                    >
                      <div>
                        <div className="flex items-baseline justify-between">
                          <h3 className="mb-5 mr-5 text-lg font-medium leading-7 text-primary sm:leading-9 sm:truncate">
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
                            {group.startDate}
                          </li>
                          <li className="font-medium text-primary">
                            <a
                              href={group.studyMaterial}
                              className="text-gray-600"
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
            <h1 className="text-2xl font-bold leading-7 text-black sm:text-2xl sm:leading-9 sm:truncate">
              Dale vida a un nuevo grupo
            </h1>
            <h2 className="leading-7 text-md text-primary sm:leading-9 sm:truncate">
              <span
                className="cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Ver requisitos
              </span>
            </h2>
          </div>

          <div className="container mx-auto overflow-hidden rounded-lg shadow bg-gray-50">
            <div className="px-6 py-5 border-b border-gray-200 md:px-8">
              <CreateGroupForm />
            </div>
          </div>
        </div>

        <GroupRequirementsModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Layout>
    );
  };

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getApprovedReactGroups(preview);
  const { dehydratedState } = await getLayout({ preview });

  return {
    props: {
      data,
      preview,
      dehydratedState,
    },
    revalidate: 1,
  };
};

export default ReactGroupPage;
