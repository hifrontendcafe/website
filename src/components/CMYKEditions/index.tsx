'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { CMYK } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import CMYKItemCard from '../CMYKItemCard';

type CMYKEditionsProps = {
  projects: CMYK[];
};

const cmykVersions = [
  { version: 'cmyk-1', name: 'CMYK 1', edition: 1 },
  { version: 'cmyk-2', name: 'CMYK 2', edition: 2 },
  { version: 'cmyk-3', name: 'CMYK 3', edition: 3 },
  { version: 'cmyk-4', name: 'CMYK 4', edition: 4 },
];

const CMYKEditions: React.FC<CMYKEditionsProps> = ({ projects }) => {
  const filteredVersions = useMemo(() => {
    const projectVersions = new Set(
      projects.map((project) => project.cmykVersion),
    );

    return cmykVersions.filter((cmykVersion) =>
      projectVersions.has(cmykVersion.version),
    );
  }, [projects]);

  const searchParams = useSearchParams();

  const currentCMYK = useMemo(() => {
    const lastVersion = filteredVersions[filteredVersions.length - 1].version;

    const edition = searchParams?.get('edition');

    if (!edition) return lastVersion;

    const currentVersion = filteredVersions.find(
      (cmyk) => cmyk.edition === +(edition as string),
    )?.version;

    return currentVersion ?? lastVersion;
  }, [filteredVersions, searchParams]);

  const currentProjects = projects.filter(
    (project) => project.cmykVersion === currentCMYK,
  );

  const tabStyle = `py-2 cursor-pointer text-tertiary w-1/3 flex justify-center border-b`;
  const tabStyleActive = `py-2 font-semibold cursor-pointer text-zinc-100 w-1/3 flex justify-center border-b-4 border-zinc-100`;

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <h3 className="font-medium subtitle">Ediciones</h3>
        <ul className="flex w-full mt-6 mb-16 md:w-8/12">
          {filteredVersions.map((cmykVersion) => (
            <li
              className={
                cmykVersion.version === currentCMYK ? tabStyleActive : tabStyle
              }
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
                className="w-full h-full"
              >
                {cmykVersion.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-full">
        <div className="relative z-10 grid max-w-4xl grid-cols-1 gap-6 p-6 mx-auto sm:px-6 lg:px-12 md:grid-cols-2 justify-items-center md:gap-10">
          {currentProjects.map((project, index) => (
            <CMYKItemCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CMYKEditions;
