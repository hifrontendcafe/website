import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Mentor, Topic } from '../../lib/types';
import MentorCard from '../MentorCard';
import SimpleModal from '../SimpleModal';

interface MentorListProps {
  mentors: Mentor[];
  topics: Topic[];
}

const MentorList: React.FC<MentorListProps> = ({ mentors, topics }) => {
  const [filteredMentors, setFilteredMentors] = useState<Mentor[] | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [session, loading] = useSession();

  const router = useRouter();
  const { query } = router;

  const queryTopic = (topic: string) => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);
    params.set('especialidad', topic);
    url.search = `?${params}`;

    router.push(url, null, { scroll: false });
  };

  /**
   * sort modifies the original orray, so make a copy to be safe
   */
  const sortedTopics = useMemo(
    () => [...topics].sort((a, b) => a.title.localeCompare(b.title)),
    [topics],
  );

  const sortedMentors = useMemo(
    () => [...mentors].sort((a) => (a.isActive ? -1 : 1)),
    [mentors],
  );

  useEffect(() => {
    const filterTopics = () => {
      const filtered = [];
      sortedMentors.forEach((mentor) => {
        const find = mentor.topics.filter(
          (topic) => topic._ref == query.especialidad,
        );
        if (find.length > 0) filtered.push(mentor);
      });
      setFilteredMentors(filtered);
    };

    filterTopics();
    return () => filterTopics();
  }, [query.especialidad, sortedMentors]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-medium text-gray-50">
          Solicita una mentoría según especialidad
        </h1>
      </div>
      <div className="relative inline-block w-full mb-6 md:w-1/2 lg:w-1/3">
        <select
          aria-label="Buscar"
          onChange={(event) => queryTopic(event.target.value)}
          className="block w-full px-4 py-2 pr-8 leading-tight bg-zinc-900 border border-zinc-400 rounded shadow appearance-none text-gray-50 hover:border-zinc-500 focus:outline-none focus:ring"
        >
          <option value="">Buscar</option>
          {sortedTopics?.map((topic, index) => (
            <option
              value={topic._id}
              key={index}
              selected={topic._id === query.especialidad}
            >
              {topic.title}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-50">
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 auto-rows-min">
          {(filteredMentors && query.especialidad
            ? filteredMentors
            : sortedMentors
          )?.map((mentor, index) => (
            <MentorCard
              key={index}
              mentor={mentor}
              topics={topics}
              isLogged={session && !loading}
              openModal={() => setIsModalOpen(true)}
            />
          ))}
        </div>
      </div>
      <SimpleModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title="¡Oh no!"
        titleClasses="text-red-600 mt-2 ml-2"
        buttonLabel="Entiendo"
        buttonClasses="text-primary"
        footer={
          <button
            type="button"
            className="flex items-center mt-2 btn btn-secondary lg:mt-0 lg:ml-10 "
            style={{ transition: 'all .15s ease' }}
            onClick={() => signIn('discord')}
          >
            Iniciar sesión
            <FontAwesomeIcon icon={faDiscord} width="15px" className="ml-2" />
          </button>
        }
      >
        <div className="px-2 overflow-auto text-lg text-gray-100">
          <p>Para poder solicitar una mentoría primero debes iniciar sesión.</p>
        </div>
      </SimpleModal>
    </div>
  );
};

export default MentorList;
