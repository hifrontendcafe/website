import Image from 'next/image';
import heart from '../../public/corazon-1.png';

import type { ReactElement } from 'react';

export default function Custom404(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-zinc-900 flex-nowrap ">
      <div className="absolute w-3/4 -translate-x-1/2 -translate-y-1/3 bg-gradient-to-b from-ellipseGreen via-ellipseGreen to-transparent left-1/2 h-3/5 ellipse blur-3xl opacity-70"></div>
      <Image
        src={heart}
        height={164}
        width={164}
        className="text-center"
        alt="Broken heart"
        placeholder="blur"
      />
      <h1 className="my-3 text-primary subtitle">404 - Page Not Found</h1>
    </div>
  );
}
