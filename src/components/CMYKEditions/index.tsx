import { getAllCMYKProjects } from '@/lib/api.server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CMYKItemCard from '../CMYKItemCard';
import { CMYKEdition, cmykVersions } from './cmykVersions';

async function CMYKEdition({ edition }: { edition: CMYKEdition }) {
  const projects = await getAllCMYKProjects({
    next: { revalidate: 60 },
  });

  // Get all the editions of the projects
  const projectVersions = new Set(
    projects.map((project) => project.cmykVersion),
  );

  // Show only the versions that have projects
  const validCmykEditions = cmykVersions.filter((cmykVersion) =>
    projectVersions.has(cmykVersion.version),
  );

  const current = validCmykEditions.find((cmyk) => cmyk.edition === edition);

  if (!current) {
    notFound();
  }

  const currentProjects = projects.filter(
    (project) => project.cmykVersion === current.version,
  );

  return (
    <section className="md:mt-10">
      <h2 className="subtitle text-center font-medium">Ediciones</h2>
      <ul className="mx-auto mb-10 mt-6 flex w-full gap-2 md:w-8/12 ">
        {validCmykEditions.map((cmyk) => (
          <li
            className={`flex-1 from-zinc-300/25 via-transparent text-center focus-within:bg-gradient-to-t hover:bg-gradient-to-t ${
              cmyk.edition === edition
                ? 'border-b-4 border-zinc-100 font-semibold'
                : 'border-b text-tertiary'
            }`}
            key={cmyk.version}
          >
            <Link className="block py-2" href={`/cmyk/${cmyk.edition}`} replace>
              {cmyk.name}
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

export default CMYKEdition;
