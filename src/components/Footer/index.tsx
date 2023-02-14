import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo_vercel from '../../../public/img/powered-by-vercel.svg';

import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitch,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSettings } from '@/lib/api.server';

const Footer: React.FC = () => {
  const { socialnetworks, footerNavItems } = use(getSettings());
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-40 border-t border-zinc-500 w-full">
      <div className="container flex justify-center w-full py-16 mx-auto text-primary md:justify-between">
        <div className="flex flex-col justify-center w-full text-center">
          <div className="flex flex-col justify-between w-full md:flex-row">
            <div className="flex flex-col gap-1 pb-8 font-medium md:pb-3">
              {footerNavItems?.map(({ link, title }) => (
                <Link
                  href={link.value}
                  key={link.value}
                  className="md:mr-10 md:text-left"
                >
                  {title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-medium text-center md:text-left">
                Encuéntranos en
              </p>
              <div className="flex justify-center gap-3 md:justify-start">
                {socialnetworks?.twitter && (
                  <Link
                    href={socialnetworks?.twitter}
                    target="_blank"
                    aria-label="Twitter"
                    className="grid w-6 h-6 rounded-full place-items-center"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </Link>
                )}

                {socialnetworks?.instagram && (
                  <Link
                    href={socialnetworks?.instagram}
                    target="_blank"
                    aria-label="Instagram"
                    className="grid w-6 h-6 rounded-full place-items-center"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                  </Link>
                )}

                {socialnetworks?.github && (
                  <Link
                    href={socialnetworks?.github}
                    target="_blank"
                    aria-label="Github"
                    className="grid w-6 h-6 rounded-full place-items-center"
                  >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </Link>
                )}

                {socialnetworks?.youtube && (
                  <Link
                    href={socialnetworks?.youtube}
                    target="_blank"
                    aria-label="Youtube"
                    className="grid w-6 h-6 rounded-full place-items-center"
                  >
                    <FontAwesomeIcon icon={faYoutube} size="lg" />
                  </Link>
                )}

                {socialnetworks?.linkedin && (
                  <Link
                    href={socialnetworks?.linkedin}
                    target="_blank"
                    aria-label="Linkedin"
                    className="grid w-6 h-6 rounded-full place-items-center "
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </Link>
                )}

                {socialnetworks?.twitch && (
                  <Link
                    href={socialnetworks?.twitch}
                    target="_blank"
                    aria-label="Twitch"
                    className="grid w-6 h-6 rounded-full place-items-center"
                  >
                    <FontAwesomeIcon icon={faTwitch} size="lg" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-16 md:flex-row">
            <div>
              <p className="mb-2 font-light md:mr-4">
                © FrontendCafé {currentYear}
              </p>
            </div>
            <div>
              <Link
                href="https://vercel.com/?utm_source=hifrontendcafe&utm_campaign=oss"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={logo_vercel} alt="Powered by Vercel" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
