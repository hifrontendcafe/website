import Link from 'next/link';
import styles from './styles.module.css';
import {
  faTwitter,
  faGithubAlt,
  faLinkedin,
  faTwitch,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocialNetworks } from '../../lib/types';

interface FooterProps {
  socialnetworks: SocialNetworks;
}

const Footer: React.FC<FooterProps> = ({ socialnetworks }) => {
  const { github, linkedin, twitch, twitter, youtube } = socialnetworks;

  const navItems = [
    { title: 'Unirse a Discord', link: 'https://discord.com/invite/3GC6TJd' },
    { title: 'Proyectos CMYK', link: '/cmyk' },
    { title: 'Mentorías', link: '/mentorias' },
    { title: 'Prácticas de Ingles', link: '/ingles' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black">
      <div className="flex justify-between container mx-auto py-16 text-white">
        <div className="flex flex-col gap-5">
          <img
            src="/logo-square.png"
            className="md:h-12 md:w-12 h-10 w-10 rounded-full"
          />
          <div className="grid grid-cols-2 gap-y-2 gap-x-5 font-medium w-full md:pb-3 pb-8">
            {navItems.map(({ link, title }) => (
              <Link href={link} key={link}>
                <a>{title}</a>
              </Link>
            ))}
          </div>
          <p className="font-light">© FrontendCafé {currentYear}</p>
        </div>

        <div className="flex flex-col justify-center md:w-1/4">
          <p className="w-auto md:text-left text-center font-medium">
            Encuentranos en
          </p>
          <div className="flex justify-center md:justify-start">
            {twitter && (
              <Link href={twitter}>
                <a
                  target="_blank"
                  className="grid place-items-center h-12 w-12 rounded-full"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </Link>
            )}

            {github && (
              <Link href={github}>
                <a
                  target="_blank"
                  className="grid place-items-center h-12 w-12 rounded-full"
                >
                  <FontAwesomeIcon icon={faGithubAlt} size="lg" />
                </a>
              </Link>
            )}

            {youtube && (
              <Link href={youtube}>
                <a
                  target="_blank"
                  className="grid place-items-center h-12 w-12 rounded-full"
                >
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </Link>
            )}

            {linkedin && (
              <Link href={linkedin}>
                <a
                  target="_blank"
                  className="grid place-items-center h-12 w-12 rounded-full "
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </Link>
            )}

            {twitch && (
              <Link href={twitch}>
                <a
                  target="_blank"
                  className="grid place-items-center h-12 w-12 rounded-full"
                >
                  <FontAwesomeIcon icon={faTwitch} size="lg" />
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
