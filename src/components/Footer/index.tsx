import { getSettings } from '@/lib/api.server';
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitch,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import logo_vercel from '../../../public/img/powered-by-vercel.svg';

const Footer = async () => {
  const { socialnetworks, footerNavItems } = await getSettings({
    next: { revalidate: 120 },
  });
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-40 border-t border-zinc-500">
      <div className="container mx-auto py-16 text-center">
        <div className="flex flex-col justify-between md:flex-row">
          <ul className="space-y-1 pb-8 font-medium md:pb-3 md:text-left">
            {footerNavItems?.map(({ link, title }) => (
              <li key={link.value}>
                {/* FIX: Docs link points to prod site. */}
                <Link href={link.value}>{title}</Link>
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <p className="font-medium md:text-left">Encuéntranos en</p>
            {/* TODO: Maybe create an icon component */}
            <ul className="flex justify-center gap-3 md:justify-start">
              {socialnetworks.twitter && (
                <li>
                  <Link
                    href={socialnetworks?.twitter}
                    target="_blank"
                    aria-label="Twitter"
                    className="inline-block h-6 w-6 rounded-full"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </Link>
                </li>
              )}
              {socialnetworks?.instagram && (
                <li>
                  <Link
                    href={socialnetworks?.instagram}
                    target="_blank"
                    aria-label="Instagram"
                    className="inline-block h-6 w-6 rounded-full"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                  </Link>
                </li>
              )}
              {socialnetworks?.github && (
                <li>
                  <Link
                    href={socialnetworks?.github}
                    target="_blank"
                    aria-label="Github"
                    className="inline-block h-6 w-6 rounded-full"
                  >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </Link>
                </li>
              )}
              {socialnetworks?.youtube && (
                <li>
                  <Link
                    href={socialnetworks?.youtube}
                    target="_blank"
                    aria-label="Youtube"
                    className="inline-block h-6 w-6 rounded-full"
                  >
                    <FontAwesomeIcon icon={faYoutube} size="lg" />
                  </Link>
                </li>
              )}
              {socialnetworks?.linkedin && (
                <li>
                  <Link
                    href={socialnetworks?.linkedin}
                    target="_blank"
                    aria-label="Linkedin"
                    className="inline-block h-6 w-6 rounded-full "
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </Link>
                </li>
              )}
              {socialnetworks?.twitch && (
                <li>
                  <Link
                    href={socialnetworks?.twitch}
                    target="_blank"
                    aria-label="Twitch"
                    className="inline-block h-6 w-6 rounded-full"
                  >
                    <FontAwesomeIcon icon={faTwitch} size="lg" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-y-2 gap-x-4 md:flex-row">
          <p className="font-light">© FrontendCafé {currentYear}</p>
          <Link
            href="https://vercel.com/?utm_source=hifrontendcafe&utm_campaign=oss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={logo_vercel} alt="Powered by Vercel" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
