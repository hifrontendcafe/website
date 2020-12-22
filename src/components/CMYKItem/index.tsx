import React from 'react';
import Link from 'next/link';

import { CMYK } from '../../lib/types';

type CMYKItemProps = {
  project: CMYK;
};

const CMYKItem: React.FC<CMYKItemProps> = ({ project }) => {
  return (
    <div
      className="p-12 w-full h-full bg-cover relative text-white flex justify-center items-end z-10"
      style={{
        backgroundImage: `url(${project.image.src})`,
      }}
    >
      <div
        className="absolute opacity-25 w-full h-full top-0 left-0 bg-black z-0"
        style={{ backgroundColor: project.color }}
      ></div>
      <div className="mb-24 w-full z-20">
        <h2 className="text-4xl font-bold my-2">{project.name}</h2>
        <p className="my-2 text-lg">{project.description}</p>
        <div className="border-t-2 w-2/5 flex text-lg justify-between my-2 uppercase pt-2 border-white">
          <Link href={project.github}>
            <a className="font-semibold" target="_blank">
              Github
            </a>
          </Link>
          <Link href={project.demo}>
            <a className="font-semibold" target="_blank">
              Demo
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CMYKItem;
