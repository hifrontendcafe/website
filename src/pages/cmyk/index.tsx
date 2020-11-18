import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from './styles.module.css';

const Proyect: React.FC = () => {
  return (
    <Layout
      mode="simple"
      title="Proyectos CMYK"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
    >
      <div
        className={`${styles.background} h-screen flex items-center justify-center`}
      >
        <Link href="/">
          <a>
            <img
              src="/logo-light-full.svg"
              className={styles.logo}
              alt="FrontendCafé"
            />
          </a>
        </Link>
        <div className="container mx-5 md:mx-0">
          <div className={styles['video-wrapper']}>
            <iframe
              // me="shadow-lg rounded-lg"
              src="https://player.twitch.tv/?channel=frontendcafe&parent=frontend.cafe"
              frameBorder="0"
              allowFullScreen={true}
              scrolling="no"
              width="1080"
              height="658"
              className={styles.video}
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Proyect;
