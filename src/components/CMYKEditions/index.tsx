import { getAllCMYKProjects } from '@/lib/api.server';
import { CMYK } from '@/lib/types';
import Link from 'next/link';
import { useMemo } from 'react';
import CMYKItemCard from '../CMYKItemCard';

type CMYKEditionsProps = {
  projects: CMYK[];
  edition?: string;
};

const cmykVersions = [
  { version: 'cmyk-1', name: 'CMYK 1', edition: 1 },
  { version: 'cmyk-2', name: 'CMYK 2', edition: 2 },
  { version: 'cmyk-3', name: 'CMYK 3', edition: 3 },
  { version: 'cmyk-4', name: 'CMYK 4', edition: 4 },
];

export default async function CMYKEditions({ edition }: { edition?: string }) {
  const projects = await getAllCMYKProjects({
    cache: 'force-cache',
    next: { revalidate: 60 },
  });

  return <Editions projects={projects} edition={edition} />;
}

const Editions: React.FC<CMYKEditionsProps> = ({ edition, projects }) => {
  const filteredVersions = useMemo(() => {
    const projectVersions = new Set(
      projects.map((project) => project.cmykVersion),
    );

    return cmykVersions.filter((cmykVersion) =>
      projectVersions.has(cmykVersion.version),
    );
  }, [projects]);

  const currentCMYK = useMemo(() => {
    const lastVersion = filteredVersions[filteredVersions.length - 1].version;

    if (!edition) return lastVersion;

    const currentVersion = filteredVersions.find(
      (cmyk) => cmyk.edition === +edition,
    )?.version;

    return currentVersion ?? lastVersion;
  }, [filteredVersions, edition]);

  const currentProjects = projects.filter(
    (project) => project.cmykVersion === currentCMYK,
  );

  return (
    <section className="mt-20">
      <h2 className="subtitle text-center font-medium">Ediciones</h2>
      <ul className="mx-auto mt-6 mb-16 flex w-full md:w-8/12">
        {filteredVersions.map((cmykVersion) => (
          <li
            className={`flex-1 cursor-pointer py-2 px-4 text-center ${
              cmykVersion.version === currentCMYK
                ? 'border-b-4 border-zinc-100 font-semibold'
                : 'border-b text-tertiary'
            }`}
            key={cmykVersion.version}
          >
            <Link
              replace
              shallow
              scroll={false}
              href={{
                pathname: '/cmyk',
                query: {
                  edition: cmykVersion.edition,
                },
              }}
            >
              {cmykVersion.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {currentProjects.map((project, index) => (
          <CMYKItemCard key={project._id} project={project} index={index} />
        ))}
      </ul>
    </section>
  );
};
