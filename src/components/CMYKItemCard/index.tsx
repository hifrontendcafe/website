import React from 'react';
import Link from 'next/link';

import { CMYK } from '../../lib/types';

type CMYKItemProps = {
  project: CMYK;
  index: number;
};

const CMYKItemCard: React.FC<CMYKItemProps> = ({ project, index }) => {
  const btnStyles = {
    color: project.color,
  };
  return (
    <div
      className={`max-w-md rounded overflow-hidden mb-5 flex flex-col ${
        index % 2 === 0 ? 'md:mb-5' : 'md:mt-5'
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
        <div className="px-3 py-4 flex flex-col border-l-2 my-4">
          <Link href={project.demo}>
            <a className="font-semibold mr-3" target="_blank">
              DEMO
            </a>
          </Link>
          <Link href={project.github}>
            <a className="font-semibold mr-3" target="_blank">
              GITHUB
            </a>
          </Link>
          <a
            href="#"
            className="btn bg-white whitespace-no-wrap"
            style={btnStyles}
          >
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
};

export default CMYKItemCard;
