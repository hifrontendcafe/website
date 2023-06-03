import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

type Props = {
  socialMedia: SocialMedia;
};

type SocialMedia = {
  [name: string]: string;
};
// TODO: Refactor and re-use
const ProfileSocialMedia: React.FC<Props> = ({ socialMedia }) => {
  return (
    <ul className="flex items-center gap-2">
      {socialMedia.twitter && (
        <li>
          <Link
            href={socialMedia.twitter}
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-primary"
          >
            <FontAwesomeIcon className="h-4 w-4" icon={faTwitter} />
          </Link>
        </li>
      )}
      {socialMedia.web && (
        <li>
          <Link
            href={socialMedia.web}
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-primary"
          >
            <FontAwesomeIcon className="h-4 w-4 " icon={faGlobe} />
          </Link>
        </li>
      )}
      {socialMedia.linkedin && (
        <li>
          <Link
            href={socialMedia.linkedin}
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-primary"
          >
            <FontAwesomeIcon className="h-4 w-4" icon={faLinkedinIn} />
          </Link>
        </li>
      )}
      {socialMedia.github && (
        <li>
          <Link
            href={socialMedia.github}
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-primary"
          >
            <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
          </Link>
        </li>
      )}
    </ul>
  );
};

export default ProfileSocialMedia;
