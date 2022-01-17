import Link from 'next/link';

const CMYKBanner: React.FC = () => {
  return (
    <div className="h-24 bg-gradient-to-r from-green-300 via-pink-500 to-yellow-300">
      <Link href="/cmyk">
        <a className="block flex items-center justify-center cursor-pointer w-full h-full text-coolGray-50 font-bold">
          <span className="block py-2 px-4 bg-black/50 hover:bg-opacity-75">
            Proyectos CMYK: Presentación final
          </span>
        </a>
      </Link>
    </div>
  );
};

export default CMYKBanner;
