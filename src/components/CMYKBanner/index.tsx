import Link from 'next/link';

const CMYKBanner: React.FC = () => {
  return (
    <div className="h-24 bg-gradient-to-r from-green-300 via-pink-500 to-yellow-300">
      <Link
        href="/cmyk"
        className="flex h-full w-full cursor-pointer items-center justify-center font-bold"
      >
        <span className="block bg-black/50 py-2 px-4 hover:bg-opacity-75">
          Proyectos CMYK: Presentación final
        </span>
      </Link>
    </div>
  );
};

export default CMYKBanner;
