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
  const { socialnetworks, footerNavItems } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={` ${mainClasses} mt-40 border-t border-zinc-500 w-full`}>
      <div className="container flex justify-center w-full py-16 mx-auto text-primary md:justify-between">
        <div className="flex flex-col justify-center w-full text-center">
          {/* <div className="self-center hidden bg-purple-500 md:block md:h-12 md:w-12 md:self-start">
            <Image
              layout="fixed"
              src={logo_square}
              height={48}
              width={48}
              placeholder="blur"
              className="rounded-full"
            />
          </div> */}
          <div className="flex flex-col justify-between w-full md:flex-row">
            <div className="flex flex-col gap-1 pb-8 font-medium md:pb-3">
              {footerNavItems?.map(({ link, title }) => (
                <Link href={link.value} key={link.value}>
                  <a className="md:mr-10 md:text-left">{title}</a>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-medium text-center md:text-left">
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

          <div className="flex flex-col items-center mt-16 md:flex-row">
            <div>
              <p className="font-light md:mr-4">© FrontendCafé {currentYear}</p>
            </div>
            <div>
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
      </div>
    </footer>
  );
};

export default Footer;
