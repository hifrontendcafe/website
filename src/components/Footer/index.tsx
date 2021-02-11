//import styles from './styles.module.css';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGithubAlt,
  faLinkedin,
  faTwitch,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const navItems = [
  { title: 'Unirse a Discord', link: 'https://discord.com/invite/3GC6TJd' },
  { title: 'Proyectos CMYK', link: '/cmyk' },
  { title: 'Mentorías', link: '/mentorias' },
  { title: 'Prácticas de Ingles', link: '/ingles' },
];

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="relative md:h-64 h-80 bg-black lg:px-32 md:px-20 md:py-8 py-5 text-white lg:text-xl text-md flex flex-col justify-between items-center md:items-start">
      <img
        src="/logo-square.png"
        className="md:h-12 md:w-12 h-10 w-10 rounded-full"
      ></img>
      <div className="flex flex-col md:flex-row w-full items-center justify-between py-5">
        <div className="grid grid-cols-2 font-medium md:w-2/4 md:pb-3 pb-8">
          {navItems.map(({ link, title }) => (
            <Link href={link} key={link}>
              <a>{title}</a>
            </Link>
          ))}
        </div>
        <div className="flex flex-col md:justify-end justify-center md:w-1/4">
          <p className="w-auto md:text-left text-center font-medium">
            Encuentranos en:
          </p>
          <div className="flex md:w-full w-40">
            <Link href="https://twitter.com/FrontEndCafe">
              <a
                target="_blank"
                className="grid place-items-center h-10 w-10 rounded-full"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
            </Link>
            <Link href="https://www.youtube.com/channel/UCUdXQMrVjrMMWG5NOZFpHqQ">
              <a
                target="_blank"
                className="grid place-items-center h-10 w-10 rounded-full"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </Link>
            <Link href="https://www.linkedin.com/company/frontendcafe/">
              <a
                target="_blank"
                className="grid place-items-center h-10 w-10 rounded-full"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </Link>
            <Link href="https://www.twitch.tv/frontendcafe">
              <a
                target="_blank"
                className="grid place-items-center h-10 w-10 rounded-full"
              >
                <FontAwesomeIcon icon={faTwitch} size="lg" />
              </a>
            </Link>
            <Link href="https://github.com/hifrontendcafe">
              <a
                target="_blank"
                className="grid place-items-center h-10 w-10 rounded-full"
              >
                <FontAwesomeIcon icon={faGithubAlt} size="lg"/>
              </a>
            </Link>
            <Link href="https://www.instagram.com/frontendcafe_/">
              <a
                target="_blank"
                className="grid place-items-center h-10 w-10 rounded-full"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg"/>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <p className="font-light">© FrontendCafé {currentYear}</p>
    </footer>
  );
};

export default Footer;
