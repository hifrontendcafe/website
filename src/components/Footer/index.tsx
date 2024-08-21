import { getSettings } from '@/lib/sanity/settings/getSettings';
import Image from 'next/image';
import Link from 'next/link';
import logo_vercel from '../../../public/img/powered-by-vercel.svg';
import SocialMediaLinks from '../SocialMediaLinks';

const Footer = async () => {
  const { socialnetworks, footerNavItems } = await getSettings({
    next: {
      revalidate: 120,
    },
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
            <SocialMediaLinks
              className="justify-center md:justify-start"
              socialMedia={socialnetworks}
              background="transparent"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-x-4 gap-y-2 md:flex-row">
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
