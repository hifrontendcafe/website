import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { Mentor, Topic } from '../../lib/types';
import MentorCard from '../MentorCard';
import SimpleModal from '../SimpleModal';
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
  const [session, loading] = useSession();

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

  return (
    <div className="container px-5 py-24 mx-auto min">
      <div className="flex justify-between">
        <h1 className="text-3xl text-primary">Mentores</h1>
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
                isLogged={session && !loading}
                openModal={() => setIsModalOpen(true)}
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
        footer={
          <button
            className="flex items-center mt-2 btn btn-secondary lg:mt-0 lg:ml-10 "
            style={{ transition: 'all .15s ease' }}
            onClick={() => signIn('discord')}
          >
            Iniciar Sesión
            <FontAwesomeIcon icon={faDiscord} width="15px" className="ml-2" />
          </button>
        }
      >
        <div className="px-2 overflow-auto text-lg">
          <p>Para poder solicitar una mentoría primero debes iniciar sesión.</p>
        </div>
      </SimpleModal>
    </div>
  );
};

export default MentorList;
