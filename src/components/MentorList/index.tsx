import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Mentor, Topic } from '../../lib/types';
import MentorCard from '../MentorCard';
import SimpleModal from '../SimpleModal';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface MentorListProps {
  mentors: Mentor[];
  topics: Topic[];
}

const MentorList: React.FC<MentorListProps> = ({ mentors, topics }) => {
  const [filter, setFilter] = useState<string>();
  const [filteredTopics, setfilteredTopics] = useState<Mentor[] | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();
  const [isLogged, setIsLogged] = useState(false);

  const filterTopics = () => {
    const filtered = [];
    mentors.forEach((mentor) => {
      const find = mentor.topics.filter((topic) => topic._ref == filter);
      if (find.length > 0) filtered.push(mentor);
    });
    setfilteredTopics(filtered);
  };

  useEffect(() => {
    filterTopics();
    return () => filterTopics();
  }, [filter]);

  useEffect(() => {
    const checkLogin = () => {
      !loading && session && session.user.id
        ? setIsLogged(true)
        : setIsLogged(false);
    };
    checkLogin();
  }, [session, loading]);

  useEffect(() => {
    if (router.asPath !== '/mentorias') {
      router.asPath.split('=')[1].toString() === 'denied'
        ? setIsModalOpen(true)
        : null;
    }
  }, [router.asPath]);
  return (
    <div className="container px-5 py-24 mx-auto min">
      <div className="flex justify-between">
        <h1 className="text-3xl text-primary">Mentores</h1>
        {!isLogged && (
          <button
            onClick={() =>
              signIn('discord', {
                callbackUrl: `${window.location.origin}/mentorias`,
              })
            }
            className="flex items-center ml-3 btn btn-secondary"
          >
            Iniciar Sesión
            <FontAwesomeIcon icon={faDiscord} width="25px" className="ml-2" />
          </button>
        )}
        {isLogged && (
          <button
            onClick={() => signOut()}
            className="flex items-center ml-3 btn btn-secondary"
          >
            Cerrar Sesión
            <FontAwesomeIcon
              icon={faDiscord}
              width="25px"
              className="p-0 ml-2"
            />
          </button>
        )}
      </div>

      <label className="block mb-2 ml-2 text-xs font-bold text-gray-700 uppercase">
        Especialidades
      </label>
      <div className="relative inline-block w-full mb-6 md:w-1/2 lg:w-1/3">
        <select
          onChange={() => setFilter((event.target as HTMLInputElement).value)}
          className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
        >
          <option value="">--</option>
          {topics?.map((topic, index) => (
            <option value={topic._id} key={index}>
              {topic.title}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col min-h-screen align-center">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 auto-rows-min">
          {(filteredTopics && filter ? filteredTopics : mentors)?.map(
            (mentor, index) => (
              <MentorCard
                key={index}
                mentor={mentor}
                topics={topics}
                isLogged={isLogged}
              />
            ),
          )}
        </div>
      </div>
      <SimpleModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title="¡Oh no!"
        titleClasses="text-red-500"
        buttonLabel="Entiendo"
        buttonClasses="text-primary"
      >
        <div className="px-2 overflow-auto text-lg">
          <p>
            Para poder participar del programa de mentorías debes ser parte de
            la comunidad de FrontendCafé.
          </p>
        </div>
      </SimpleModal>
    </div>
  );
};

export default MentorList;
