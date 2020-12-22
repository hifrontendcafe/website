import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

import { CMYK } from '../../lib/types';

type CMYKItemProps = {
  project: CMYK;
};

const CMYKItem: React.FC<CMYKItemProps> = ({ project }) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${project.image.src})`,
      }}
    >
      <div
        className={styles.containerColor}
        style={{ backgroundColor: project.color }}
      ></div>
      <div className="mb-64 w-full">
        <h2 className="text-2xl my-2">{project.name}</h2>
        <p className="my-2 w-2/3">{project.description}</p>
        <div className="border-t-2 w-2/5 flex justify-between my-2 uppercase pt-2 border-white">
          <Link href={project.github}>
            <a target="_blank">Github</a>
          </Link>
          <Link href={project.demo}>
            <a target="_blank">Demo</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CMYKItem;
