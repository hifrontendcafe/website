import { use, useMemo } from 'react';
import SelectTopic from './SelectTopic';
import MentorCard from '../MentorCard';
import { getAllMentors, getMentoringTopics } from '@/lib/api.server';

interface MentorListProps {
  speciality?: string;
}

const MentorList: React.FC<MentorListProps> = ({ speciality }) => {
  const topics = use(getMentoringTopics());
  const mentors = use(getAllMentors());

  /**
   * sort modifies the original array, so make a copy to be safe
   */
  const sortedTopics = useMemo(
    () => [...topics].sort((a, b) => a.title.localeCompare(b.title)),
    [topics],
  );

  /**
   * All active mentors should be first
   */
  const sortedMentors = useMemo(
    () => [...mentors].sort((mentor) => (mentor.status === 'ACTIVE' ? -1 : 1)),
    [mentors],
  );

  const filteredMentors = useMemo(() => {
    if (!speciality) return sortedMentors;

    return sortedMentors.filter((mentor) =>
      mentor.topics?.some((topic) => topic._ref === speciality),
    );
  }, [sortedMentors, speciality]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-medium text-primary">
          Solicita una mentoría según especialidad
        </h1>
      </div>
      <div className="relative inline-block w-full mb-6 md:w-1/2 lg:w-1/3">
        <SelectTopic>
          <option value="">Buscar</option>
          {sortedTopics?.map((topic, index) => (
            <option
              value={topic._id}
              key={index}
              selected={topic._id === speciality}
            >
              {topic.title}
            </option>
          ))}
        </SelectTopic>

        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-primary">
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
          {filteredMentors.map((mentor, index) => (
            <MentorCard key={index} mentor={mentor} topics={topics} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorList;
