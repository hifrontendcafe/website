'use client';

import { useRouter } from 'next/navigation';

const SelectTopic: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const queryTopic = (topic: string) => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);
    params.set('especialidad', topic);
    url.search = `?${params}`;

    router.replace(url.toString());
  };

  return (
    <select
      aria-label="Buscar"
      onChange={(event) => queryTopic(event.target.value)}
      className="block w-full px-4 py-2 pr-8 leading-tight bg-zinc-900 border border-zinc-400 rounded shadow appearance-none text-primary hover:border-zinc-500 focus:outline-none focus:ring"
    >
      {children}
    </select>
  );
};

export default SelectTopic;
