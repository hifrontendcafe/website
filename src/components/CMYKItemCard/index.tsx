import Link from 'next/link';

import { CMYK } from '@/lib/types';

import tinycolor from 'tinycolor2';

type CMYKItemProps = {
  project: CMYK;
  index: number;
};

const CMYKItemCard: React.FC<CMYKItemProps> = ({ project }) => {
  const textColor = tinycolor(project.color);

  return (
    <div className={`rounded overflow-hidden flex flex-col`}>
      <img
        className="h-40 object-cover w-full"
        src={project.image.src}
        alt="Project image"
      />
      <div
        className={`flex flex-col md:flex-row h-auto ${
          textColor.isLight() ? 'text-gray-900' : 'text-gray-50'
        }`}
        style={{ backgroundColor: project.color }}
      >
        <div className="px-6 py-4">
          <div className="font-semibold text-2xl mb-2">{project.name}</div>
          <p className="text-sm">{project.description}</p>
        </div>
        <div
          className={`px-6 md:px-3 md:py-8 flex xs:flex-row md:flex-col md:justify-between ${
            textColor.isLight() ? 'border-gray-800' : 'border-white'
          }  md:border-l-2 md:border-t-0 my-4`}
        >
          <Link href={project.demo}>
            <a
              className={`font-semibold mr-3 hover:underline border-t-2 md:border-t-0 ${
                textColor.isLight() ? 'border-gray-800' : 'border-white'
              }`}
              target="_blank"
            >
              DEMO
            </a>
          </Link>
          <Link href={project.github}>
            <a
              className={`font-semibold mr-3 hover:underline border-t-2 md:border-t-0 ${
                textColor.isLight() ? 'border-gray-800' : 'border-white'
              }`}
              target="_blank"
            >
              GITHUB
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CMYKItemCard;
