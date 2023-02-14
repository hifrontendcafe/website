import Image from 'next/image';
import heart from '../../public/corazon-1.png';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-nowrap mt-20">
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
