import { Mentor } from '@/lib/sanity/mentor/getMentor';
import { SocialNetworks } from '@/lib/sanity/settings/getSettings';
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitch,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import Link from 'next/link';

const iconCollection = {
  web: faGlobe,
  linkedin: faLinkedinIn,
  twitter: faTwitter,
  github: faGithub,
  instagram: faInstagram,
  youtube: faYoutube,
  twitch: faTwitch,
};

interface Props extends React.ComponentProps<'ul'> {
  background?: 'solid' | 'transparent';
  socialMedia: SocialMedia | Mentor | SocialNetworks;
}
type IconCollection = typeof iconCollection;
type SocialMedia = {
  [name: string]: string;
};

function SocialMediaLinks({
  className,
  socialMedia,
  background = 'solid',
}: Props) {
  const icons = Object.entries(socialMedia)
    .filter(
      ([social, value]) =>
        iconCollection[social as keyof IconCollection] && !!value,
    )
    .map(([social, url]) => ({
      social,
      url,
      icon: iconCollection[social as keyof IconCollection],
    }));

  const linkStyles = {
    solid: 'bg-zinc-700',
    transparent: 'bg-transparent',
  };

  return (
    <ul className={clsx('flex items-center gap-2', className)}>
      {icons.map(({ icon, social, url }) => (
        <li key={social}>
          <Link
            aria-label={`Visitar ${social}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'flex items-center justify-center rounded-full p-1.5 outline-none ring-greenFec transition-colors ease-out hover:bg-white/20 focus-visible:ring-2',
              linkStyles[background],
            )}
          >
            <FontAwesomeIcon className="h-5 w-5" icon={icon} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SocialMediaLinks;
