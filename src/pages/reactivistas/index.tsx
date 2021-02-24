import { useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { getApprovedReactGroups } from '../../lib/api';
import { ReactGroup } from '../../lib/types';
import { usePreviewSubscription } from '../../lib/sanity';
import { reactGroupQuery } from '../../lib/queries';
import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
import AddParticipantForm from '../../components/reactivistas/AddParticipantForm';
import GroupInfoModal from '../../components/reactivistas/GroupInfoModal';
import CreateGroupForm from '../../components/reactivistas/CreateGroupForm';
import GroupRequirementsModal from '../../components/reactivistas/GroupRequirementsModal';

const ReactGroupPage: React.FC<InferGetStaticPropsType<
  typeof getStaticProps
>> = ({ data, preview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: groups } = usePreviewSubscription(reactGroupQuery, {
    initialData: data,
    enabled: preview,
  });

  return (
    <Layout title="Iniciativas">
      <Hero small title="Reactivistas" />
      <div className="pb-24 bg-indigo-100 sm:pt-10 lg:mt-0 mt-24">
        <Link href="/docs/guia-reactivistas">
          <a
            className="flex justify-center mx-10 text-white text-center bg-primary border-0 py-2  px-6
            focus:outline-none hover:bg-primarydark rounded text-lg font-bold"
          >
            ¿De qué se trata Reactivistas?
          </a>
        </Link>
        <div className="container mx-auto m-10 p-10 bg-white shadow">
          <h1 className="text-2xl font-bold leading-7 text-black sm:text-2xl sm:leading-9 sm:truncate">
            Sumate a los grupos que están comenzando
          </h1>
          <div className="flex flex-wrap md:m-10 m-2">
            {groups.map((group: ReactGroup) => {
              const [infoModalOpen, setInfoModalOpen] = useState(false);

              return (
                <>
                  <div
                    key={group.name}
                    className="flex flex-col flex-auto rounded-md shadow-lg md:mx-5 mx-1 my-5 md:p-10 p-5"
                  >
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium leading-7 text-lg text-primary mb-5 mr-5 sm:leading-9 sm:truncate">
                        ⚛ {group.name}
                      </h3>
                      <button onClick={() => setInfoModalOpen(true)}>❔</button>
                    </div>
                    <ul className="mb-6">
                      <li key={group.topic} className="mb-2 font-medium">
                        Tema: <b>{group.topic}</b>
                      </li>
                      <li className="mb-2 font-medium text-primary">
                        <a href={group.studyMaterial}>📚 Material de Estudio</a>
                      </li>
                      <li className="font-medium">
                        Fecha de inicio: {group.startDate}
                      </li>
                    </ul>
                    {group.participants && group.participants.length >= 10 ? (
                      <div className="font-md text-md text-red-500">
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
                </>
              );
            })}
          </div>
        </div>

        <div className="container mx-auto overflow-hidden bg-white rounded-lg shadow ">
          <div className="px-6 pt-20 border-b border-gray-200 md:py-5 md:px-8">
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-7 text-black sm:text-2xl sm:leading-9 sm:truncate">
                  Proponé un nuevo grupo
                </h1>
                <h2 className="font-medium leading-7 text-md text-primary sm:leading-9 sm:truncate">
                  <span
                    className="cursor-pointer text-blue-400"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Ver Requisitos
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <CreateGroupForm />
        </div>
      </div>
      <button></button>

      <GroupRequirementsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getApprovedReactGroups(preview);

  return {
    props: {
      data,
      preview,
    },
    revalidate: 1,
  };
};

export default ReactGroupPage;
