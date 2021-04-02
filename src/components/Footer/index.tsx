import Link from 'next/link';
import styles from './styles.module.css';
import {
  faTwitter,
  faGithubAlt,
  faLinkedin,
  faTwitch,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocialNetworks } from '../../lib/types';

interface FooterProps {
  socialnetworks: SocialNetworks;
}

const Footer: React.FC<FooterProps> = ({ socialnetworks }) => {
  const navItems = [
    { title: 'Unirse a Discord', link: 'https://discord.com/invite/3GC6TJd' },
    { title: 'Proyectos CMYK', link: '/cmyk' },
    { title: 'Mentorías', link: '/mentorias' },
    { title: 'Prácticas de Ingles', link: '/ingles' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black">
      <div className="flex flex-col-reverse gap-12 md:gap-0 md:flex-row justify-center md:justify-between container mx-auto py-16 text-white">
        <div className="flex flex-col gap-5 text-center md:text-left">
          <img
            src="/logo-square.png"
            className="hidden md:block md:h-12 md:w-12 h-10 w-10 rounded-full"
          />
          <div className="grid justify-center md:grid-cols-2 gap-y-2 gap-x-5 font-medium w-full md:pb-3 pb-8">
            {navItems?.map(({ link, title }) => (
              <Link href={link} key={link}>
                <a>{title}</a>
              </Link>
            ))}
          </div>

          <p className="font-light">© FrontendCafé {currentYear}</p>
        </div>

        <div className="flex flex-col justify-center md:w-1/4 gap-3">
          <p className="w-auto md:text-left text-center font-medium">
            Encuentranos en
          </p>
          <div className="flex justify-center md:justify-start gap-3">
            {socialnetworks?.twitter && (
              <Link href={socialnetworks?.twitter}>
                <a
                  target="_blank"
                  className="grid place-items-center h-6 w-6 rounded-full"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </Link>
            )}

            {socialnetworks?.github && (
              <Link href={socialnetworks?.github}>
                <a
                  target="_blank"
                  className="grid place-items-center h-6 w-6 rounded-full"
                >
                  <FontAwesomeIcon icon={faGithubAlt} size="lg" />
                </a>
              </Link>
            )}

            {socialnetworks?.youtube && (
              <Link href={socialnetworks?.youtube}>
                <a
                  target="_blank"
                  className="grid place-items-center h-6 w-6 rounded-full"
                >
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </Link>
            )}

            {socialnetworks?.linkedin && (
              <Link href={socialnetworks?.linkedin}>
                <a
                  target="_blank"
                  className="grid place-items-center h-6 w-6 rounded-full "
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </Link>
            )}

            {socialnetworks?.twitch && (
              <Link href={socialnetworks?.twitch}>
                <a
                  target="_blank"
                  className="grid place-items-center h-6 w-6 rounded-full"
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
