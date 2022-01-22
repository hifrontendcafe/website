import Link from 'next/link';
import Image from 'next/image';

import { CMYK } from '../../lib/types';

type CMYKItemProps = {
  project: CMYK;
  index: number;
};

const CMYKItemCard: React.FC<CMYKItemProps> = ({ project }) => {
  return (
    <div className="flex flex-col justify-between p-5 overflow-hidden border-2 border-zinc-500 rounded-lg lg:w-96 bg-gray-900">
      <div>
        <Image
          className="object-cover w-full h-40 rounded-lg"
          src={project.image.src}
          alt={`Imagen del proyecto ${project.name}`}
          placeholder="blur"
          blurDataURL={project.image.src}
          width={340}
          height={160}
        />
        <h1 className="my-2 cards-title">{project.name}</h1>
        <p className="cards-paragraph">{project.description}</p>
      </div>
      <div className="flex justify-between w-full mt-5">
        <Link href={project.demo}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center btn px-9 lg:px-14 btn-primary"
          >
            Demo
          </a>
        </Link>
        <Link href={project.github}>
          <a
            target="_blank"
            rel="noopener noreferrer"
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
