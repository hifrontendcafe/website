import Image from 'next/image';
import heart from '../../../public/corazon-1.png';

export default function NotFound() {
  return (
    <div className="mt-20 text-center">
      <Image
        src={heart}
        height={164}
        width={164}
        className="mx-auto"
        alt="Broken heart"
        placeholder="blur"
      />
      <h1 className="subtitle my-3">404 - Page Not Found</h1>
    </div>
  );
}
