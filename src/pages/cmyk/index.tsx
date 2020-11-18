import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import Layout from '../../components/Layout';
import styles from './styles.module.css';

const eventDate = new Date(2020, 10, 18, 18);

const formatCountdown = () =>
  formatDistance(eventDate, new Date(), {
    addSuffix: true,
    includeSeconds: true,
    locale: es,
  });

const Proyect: React.FC = () => {
  const [countdown, setCountdown] = useState(formatCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatCountdown());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Layout
      mode="simple"
      title="Proyectos CMYK"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
    >
      <div
        className={`${styles.background} h-screen flex items-center justify-center`}
      >
        <div className={styles.header}>
          <Link href="/">
            <a className={styles.logo}>
              <img src="/logo-light-full.svg" alt="FrontendCafé" />
            </a>
          </Link>
          <div className="text-white text-lg mt-8">Empieza {countdown}...</div>
        </div>
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
