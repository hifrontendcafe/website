import React from 'react';
import Link from 'next/link';

import { CMYK } from '../../lib/types';

type CMYKItemProps = {
  project: CMYK;
  index: number;
};

const CMYKItemCard: React.FC<CMYKItemProps> = ({ project, index }) => {
  return (
    <div
      className={`max-w-md rounded overflow-hidden ${
        index % 2 === 0 ? 'mb-10' : 'mt-10'
      }`}
    >
      <img
        className="h-40 object-cover w-full"
        src={project.image.src}
        alt="Project image"
      />
      <div
        className="flex flex-row text-white"
        style={{ backgroundColor: project.color }}
      >
        <div className="px-6 py-4">
          <div className="font-semibold text-2xl mb-2">{project.name}</div>
          <p className="text-sm">{project.description}</p>
        </div>
        <div className="px-6 py-4 flex flex-col border-l-2 my-4">
          <Link href={project.github}>
            <a className="font-semibold mr-3" target="_blank">
              Github
            </a>
          </Link>
          <Link href={project.demo}>
            <a className="font-semibold mr-3" target="_blank">
              DEMO
            </a>
          </Link>
          <button>Ver más</button>
        </div>
      </div>
    </div>
  );
};

export default CMYKItemCard;
