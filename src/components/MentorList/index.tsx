import { useEffect, useState } from 'react';
import { Mentor, Topic } from '../../lib/types';
import MentorCard from '../MentorCard';
import TopicBadge from '../TopicBadge';

interface MentorListProps {
  mentors: Mentor[];
  topics: Topic[];
}

const MentorList: React.FC<MentorListProps> = ({ mentors, topics }) => {
  const [filter, setFilter] = useState<string>()
  const [filteredTopics, setfilteredTopics] = useState <Mentor[] | undefined>(undefined);


  useEffect(() => {
    filterTopics()
    return () => filterTopics();
  }, [filter])

  const filterTopics = () => {
    const filtered = [];

    mentors.forEach((mentor) => {
      const find = mentor.topics.filter(topic => topic._ref == filter);
      if (find.length > 0) filtered.push(mentor);
    })

    setfilteredTopics(filtered);
  }

  return (
    <>
      <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-2"> Especialidades </label>
      <div className="inline-block relative w-full md:w-1/2 lg:w-1/3 mb-6">
        <select onChange={() => setFilter((event.target as HTMLInputElement).value)} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="">--</option>
          {topics.map((topic, index) => (
            <option value={topic._id} key={index}>{topic.title}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <li className="flex align-center flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-screen grid-rows-6">
          {(filteredTopics && filter ? filteredTopics : mentors).map((mentor, index) => (
            <MentorCard key={index} mentor={mentor} topics={topics} />
          ))}
        </div>
      </li>
    </>
  );
};

export default MentorList;
