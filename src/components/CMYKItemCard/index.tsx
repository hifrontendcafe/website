import Link from 'next/link';

import { CMYK } from '../../lib/types';

type CMYKItemProps = {
  project: CMYK;
  index: number;
};

const CMYKItemCard: React.FC<CMYKItemProps> = ({ project }) => {
  return (
    // <div className="p-5 w-96 bg-gray-800 border border-gray-500 rounded-lg flex flex-col justify-between overflow-hidden">
    <div className="p-5 w-72 lg:w-96 bg-gray-800 border border-gray-500 rounded-lg flex flex-col justify-between overflow-hidden">
      <div>
        <img
          className="rounded-lg object-cover h-40 w-full"
          src={project.image.src}
          alt="Project image"
        />
        <h1 className="cards-title my-2">{project.name}</h1>
        <p className="text-gray-200 text-sm font-light">
          {project.description}
        </p>
      </div>
      <div className="w-full flex justify-between mt-5">
        <Link href={project.demo}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // className=" font-sans font-semibold text-sm bg-gray-50 rounded-lg"
            className="btn px-9 lg:px-14 btn-primary"
          >
            Demo
          </a>
        </Link>
        <Link href={project.github}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // className="py-2 px-14 font-sans font-semibold text-sm text-gray-50 border border-gray-50 rounded-lg"
            className="btn px-9 lg:px-14 btn-secondary"
          >
            GitHub
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CMYKItemCard;
