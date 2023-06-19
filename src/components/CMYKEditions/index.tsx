'use client';

import type { CMYK } from '@/lib/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CMYKItemCard from '../CMYKItemCard';
import { cmykVersions } from './cmykVersions';

function CMYKEditions({ projects }: { projects: CMYK[] }) {
  const projectVersions = new Set(
    projects.map((project) => project.cmykVersion),
  );

  const filteredVersions = cmykVersions.filter((cmykVersion) =>
    projectVersions.has(cmykVersion.version),
  );

  const searchParams = useSearchParams()!;
  const edition = searchParams.get('edition');

  const lastVersion = filteredVersions[filteredVersions.length - 1];
  const currentVersion = filteredVersions.find(
    (cmyk) => cmyk.edition === Number(edition || lastVersion.edition),
  )?.version;

  const currentCMYK = currentVersion ?? lastVersion.version;

  const currentProjects = projects.filter(
    (project) => project.cmykVersion === currentCMYK,
  );

  return (
    <section className="md:mt-10">
      <h2 className="subtitle text-center font-medium">Ediciones</h2>
      <ul className="mx-auto mt-6 mb-10 flex w-full gap-2 md:w-8/12 ">
        {cmykVersions.map(({ edition, version, name }) => (
          <li
            className={`flex-1 from-zinc-300/25 via-transparent text-center focus-within:bg-gradient-to-t hover:bg-gradient-to-t ${
              version === currentCMYK
                ? 'border-b-4 border-zinc-100 font-semibold'
                : 'border-b text-tertiary'
            }`}
            key={version}
          >
            <Link
              className="block py-2"
              href={`/cmyk?edition=${edition}`}
              replace
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mx-auto grid max-w-4xl grid-cols-1 justify-items-center gap-6 p-6 sm:px-6 md:grid-cols-2 md:gap-10 lg:px-12">
        {currentProjects.map((project, index) => (
          <CMYKItemCard key={project._id} project={project} index={index} />
        ))}
      </ul>
    </section>
  );
}

export default CMYKEditions;
