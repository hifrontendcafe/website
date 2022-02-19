import Link from 'next/link';
import Image from 'next/image';
import logo_vercel from '../../../public/img/powered-by-vercel.svg';
import logo_square from '../../../public/logo-square.png';

import {
  faTwitter,
  faGithubAlt,
  faLinkedin,
  faTwitch,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSettings } from '@/lib/settings';

type FooterProps = {
  mainClasses?: string;
};
const Footer: React.FC<FooterProps> = ({ mainClasses }) => {
  const { socialnetworks } = useSettings();

  const navItems = [
    { title: 'Mentorías', link: '/mentorias' },
    { title: 'Prácticas de inglés', link: '/ingles' },
    { title: 'Nuestros talentos', link: '/talentos' },
    { title: 'Reactivistas', link: '/reactivistas' },
    { title: 'Eventos', link: '/eventos' },
    { title: 'Conoce a nuestro equipo', link: '/equipo' },
    { title: 'Proyectos CMYK', link: '/cmyk' },
    { title: 'Preguntas frecuentes', link: '/faqs' },
    { title: 'Únete a Discord', link: 'https://discord.gg/frontendcafe' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={` ${mainClasses} mt-40 border-t border-zinc-500`}>
      <div className="container flex flex-col-reverse justify-center gap-12 py-16 mx-auto text-gray-50 md:gap-0 md:flex-row md:justify-between">
        <div className="flex flex-col gap-5 text-center md:text-left">
          <div className="hidden md:block md:h-12 md:w-12 self-center md:self-start">
            <Image
              layout="fixed"
              src={logo_square}
              height={48}
              width={48}
              placeholder="blur"
              className="rounded-full"
            />
          </div>
          <div className="grid justify-center w-full pb-8 font-medium text-left md:grid-cols-3 gap-y-2 gap-x-5 md:pb-3">
            {navItems?.map(({ link, title }) => (
              <Link href={link} key={link}>
                <a>{title}</a>
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center md:flex-row">
            <div>
              <p className="mr-4 font-light">© FrontendCafé {currentYear}</p>
            </div>
            <div className="mt-5 md:mt-0">
              <Link href="https://vercel.com/?utm_source=hifrontendcafe&utm_campaign=oss">
                <a target="_blank" rel="noopener noreferrer">
                  <Image
                    src={logo_vercel}
                    alt="Powered by Vercel"
                    placeholder="blur"
                    blurDataURL={logo_vercel}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3">
          <p className="w-auto font-medium text-center md:text-left">
            Encuéntranos en
          </p>
          <div className="flex justify-center gap-3 md:justify-start">
            {socialnetworks?.twitter && (
              <Link href={socialnetworks?.twitter}>
                <a
                  target="_blank"
                  className="grid w-6 h-6 rounded-full place-items-center"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </Link>
            )}

            {socialnetworks?.instagram && (
              <Link href={socialnetworks?.instagram}>
                <a
                  target="_blank"
                  className="grid w-6 h-6 rounded-full place-items-center"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </Link>
            )}

            {socialnetworks?.github && (
              <Link href={socialnetworks?.github}>
                <a
                  target="_blank"
                  className="grid w-6 h-6 rounded-full place-items-center"
                >
                  <FontAwesomeIcon icon={faGithubAlt} size="lg" />
                </a>
              </Link>
            )}

            {socialnetworks?.youtube && (
              <Link href={socialnetworks?.youtube}>
                <a
                  target="_blank"
                  className="grid w-6 h-6 rounded-full place-items-center"
                >
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </Link>
            )}

            {socialnetworks?.linkedin && (
              <Link href={socialnetworks?.linkedin}>
                <a
                  target="_blank"
                  className="grid w-6 h-6 rounded-full place-items-center "
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </Link>
            )}

            {socialnetworks?.twitch && (
              <Link href={socialnetworks?.twitch}>
                <a
                  target="_blank"
                  className="grid w-6 h-6 rounded-full place-items-center"
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
