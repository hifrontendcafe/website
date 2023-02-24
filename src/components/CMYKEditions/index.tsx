import { useMemo } from 'react';
import { CMYK } from '@/lib/types';
import CMYKItemCard from '../CMYKItemCard';

type CMYKEditionsProps = {
  projects: CMYK[];
  edition?: string;
};

export const cmykVersions = [
  { version: 'cmyk-1', name: 'CMYK 1', edition: 1 },
  { version: 'cmyk-2', name: 'CMYK 2', edition: 2 },
  { version: 'cmyk-3', name: 'CMYK 3', edition: 3 },
  { version: 'cmyk-4', name: 'CMYK 4', edition: 4 },
];

export const lastVersion = cmykVersions[cmykVersions.length - 1].version;

const CMYKEditions: React.FC<CMYKEditionsProps> = ({ edition, projects }) => {
  const currentCMYK = useMemo(() => {
    if (!edition) return lastVersion;

    const currentVersion = cmykVersions.find(
      (cmyk) => cmyk.edition === +edition,
    )?.version;

    return currentVersion ?? lastVersion;
  }, [edition]);

  const currentProjects = projects.filter(
    (project) => project.cmykVersion === currentCMYK,
  );

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
