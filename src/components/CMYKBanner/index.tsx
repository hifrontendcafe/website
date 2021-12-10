import Link from 'next/link';
import styles from './styles.module.css';

const CMYKBanner: React.FC = () => {
  return (
    <div className={`${styles.root} h-24`}>
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
