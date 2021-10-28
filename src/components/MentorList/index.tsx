import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { MentorCalomentor, TimeSlot, Topic } from '../../lib/types';
import MentorCard from '../MentorCard';
import SimpleModal from '../SimpleModal';

const topics: Topic[] = [
  { value: 'Diseño UX-UI', label: 'Diseño UX-UI' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Product management', label: 'Product management' },
  { value: 'Inglés', label: 'Inglés' },
  { value: 'Entrepreneurship', label: 'Entrepreneurship' },
  { value: 'Analítica web / App', label: 'Analítica web / App' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Git', label: 'Git' },
  {
    value: 'Data science / Data engineer',
    label: 'Data science / Data engineer',
  },
  {
    value: 'Diseño y arquitectura de software',
    label: 'Diseño y arquitectura de software',
  },
  { value: 'Soft skills', label: 'Soft skills' },
  { value: 'Orientación / CV', label: 'Orientación / CV' },
  { value: 'Intro a la programación', label: 'Intro a la programación' },
];

interface MentorListProps {
  mentors: MentorCalomentor[];
  slots: TimeSlot[][];
}

function _getMentorSlot(slots: TimeSlot[][], mentorId: string) {
  return slots.find((s) => s[0].user_id === mentorId);
}

const MentorList: React.FC<MentorListProps> = ({ mentors, slots }) => {
  const [filter, setFilter] = useState<string>();
  const [filteredTopics, setfilteredTopics] = useState<
    MentorCalomentor[] | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [session, loading] = useSession();

  useEffect(() => {
    const filterTopics = () => {
      const filtered = [];
      mentors.forEach((mentor) => {
        const find = mentor.skills.filter((topic) => topic == filter);
        if (find.length > 0) filtered.push(mentor);
      });
      setfilteredTopics(filtered);
    };

    filterTopics();
    return () => filterTopics();
  }, [filter, mentors]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-medium text-coolGray-50">
          Solicita una mentoría segun especialidad
        </h1>
      </div>
      <div className="relative inline-block w-full mb-6 md:w-1/2 lg:w-1/3">
        <select
          onChange={() => setFilter((event.target as HTMLInputElement).value)}
          className="block w-full px-4 py-2 pr-8 leading-tight bg-gray-900 border border-gray-400 rounded shadow appearance-none text-coolGray-50 hover:border-gray-500 focus:outline-none focus:shadow-outline"
        >
          <option value="">Buscar</option>
          {topics?.map((topic, index) => (
            <option value={topic.value} key={index}>
              {topic.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-coolGray-50">
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 auto-rows-min">
          {(filteredTopics && filter ? filteredTopics : mentors)?.map(
            (mentor, index) => (
              <MentorCard
                key={index}
                mentor={mentor}
                topics={topics}
                isLogged={session && !loading}
                openModal={() => setIsModalOpen(true)}
                mentorSlots={_getMentorSlot(slots, mentor.id)}
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
