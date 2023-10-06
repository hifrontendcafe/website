'use client';

import type { DiscordEvent, Mentor, Topic } from '@/lib/types';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import MentorCard from '../MentorCard';
import SimpleModal from '../SimpleModal';
import { requestWarningsStates, useWarnings } from './useWarnings';

interface MentorListProps {
  mentors: Mentor[];
  topics: Topic[];
  events: DiscordEvent[];
}

const MentorList: React.FC<MentorListProps> = ({ mentors, topics, events }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status: sessionStatus } = useSession();
  const loading = sessionStatus === 'loading';
  const { status, warnings, mentorships } = useWarnings(session?.user.id);
  const router = useRouter();

  const queryTopic = (topic: string) => {
    if (!topic) return router.replace('/mentorias');

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('especialidad', topic);
    url.search = `?${params}`;

    router.replace(url.toString());
  };

  const searchParams = useSearchParams()!;
  const speciality = searchParams.get('especialidad') ?? '';
  const filteredByTopic: Mentor[] = mentors.filter((mentor) =>
    mentor.topics.some((topic) => topic._ref === speciality),
  );
  const filteredMentors = speciality ? filteredByTopic : mentors;

  return (
    <section className="mt-20">
      <div className="mb-10 flex flex-col justify-between lg:flex-row lg:items-center">
        <h2 className="mb-4 text-2xl font-medium lg:m-0">
          Solicita una mentoría según especialidad
        </h2>
        <label
          aria-label="Buscar"
          className="relative inline-block w-full md:w-1/2 lg:w-1/3"
        >
          <select
            onChange={(event) => queryTopic(event.target.value)}
            value={speciality}
            className="w-full appearance-none rounded border border-zinc-400 bg-zinc-900 px-4 py-2 pr-8  leading-tight hover:border-zinc-500 focus:outline-none focus:ring"
          >
            <option value="">Buscar...</option>
            {topics?.map((topic) => (
              <option value={topic._id} key={topic._id}>
                {topic.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </label>
      </div>
      <ul className="grid gap-12 lg:grid-cols-2">
        {filteredMentors?.map((mentor, index) => {
          const discordEvent = events?.find(
            ({ creator_id, channel_id }) =>
              creator_id === mentor._id &&
              [
                '756023543304814664',
                '756023931433123900',
                '761337525654126592',
              ].includes(channel_id!),
          );

          return (
            <MentorCard
              key={index}
              mentor={mentor}
              topics={topics}
              canBookAMentorship={
                !!session &&
                !loading &&
                status === requestWarningsStates.SUCCESS &&
                warnings === 0 &&
                mentorships <= 4
              }
              openModal={() => setIsModalOpen(true)}
              event={discordEvent}
            />
          );
        })}
      </ul>

      <SimpleModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title="¡Oh no!"
        titleClasses="text-red-600"
        buttonLabel="Entiendo"
        buttonClasses=""
        footer={
          !session && (
            <button
              type="button"
              className="btn btn-secondary flex items-center gap-2"
              style={{ transition: 'all .15s ease' }}
              onClick={() => signIn('discord')}
            >
              Iniciar sesión
              <FontAwesomeIcon icon={faDiscord} width="15px" />
            </button>
          )
        }
      >
        {!session && (
          <p>Para poder solicitar una mentoría primero debes iniciar sesión.</p>
        )}
        {session && warnings > 0 && (
          <p>
            Tienes penalizaciones en mentorías anteriores, si crees que es un
            error{' '}
            <a
              target="_blank"
              href="https://discord.com/channels/594363964499165194/897161654377271346"
              rel="noreferrer"
              className="underline hover:text-greenFec"
            >
              contáctanos.
            </a>
          </p>
        )}
        {session && warnings === 0 && mentorships > 4 && (
          <p>
            Has llegado al límite de mentorías por mes, si crees que es un error
            <a
              target="_blank"
              href="https://discord.com/channels/594363964499165194/897161654377271346"
              rel="noreferrer"
              className="underline hover:text-greenFec"
            >
              contáctanos.
            </a>
          </p>
        )}
      </SimpleModal>
    </section>
  );
};

export default MentorList;
