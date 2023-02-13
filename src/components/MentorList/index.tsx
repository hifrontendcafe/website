'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Topic } from '@/lib/types';

interface MentorListProps {
  topics: Topic[];
  children: React.ReactNode;
}

const MentorList: React.FC<MentorListProps> = ({ topics, children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const speciality = searchParams.get('especialidad');

  const queryTopic = (topic: string) => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);
    params.set('especialidad', topic);
    url.search = `?${params}`;

    router.replace(url.toString());
  };

  /**
   * sort modifies the original array, so make a copy to be safe
   */
  const sortedTopics = useMemo(
    () => [...topics].sort((a, b) => a.title.localeCompare(b.title)),
    [topics],
  );

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-medium text-primary">
          Solicita una mentoría según especialidad
        </h1>
      </div>
      <div className="relative inline-block w-full mb-6 md:w-1/2 lg:w-1/3">
        <select
          aria-label="Buscar"
          onChange={(event) => queryTopic(event.target.value)}
          className="block w-full px-4 py-2 pr-8 leading-tight bg-zinc-900 border border-zinc-400 rounded shadow appearance-none text-primary hover:border-zinc-500 focus:outline-none focus:ring"
        >
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
        </select>
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default MentorList;
