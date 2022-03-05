import {
  faGithubAlt,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

type Props = {
  socialMedia: SocialMedia;
};

type SocialMedia = {
  [name: string]: string;
};

const ProfileSocialMedia: React.FC<Props> = ({ socialMedia }) => {
  return (
    <div className="flex items-center space-x-2">
      {socialMedia.twitter && (
        <Link href={socialMedia.twitter}>
          <a
            target="_blank"
            className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-50 bg-zinc-700"
          >
            <FontAwesomeIcon className="w-4 h-4" icon={faTwitter} />
          </a>
        </Link>
      )}
      {socialMedia.web && (
        <Link href={socialMedia.web}>
          <a
            target="_blank"
            className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-50 bg-zinc-700"
          >
            <FontAwesomeIcon className="w-4 h-4 " icon={faGlobe} />
          </a>
        </Link>
      )}
      {socialMedia.linkedin && (
        <Link href={socialMedia.linkedin}>
          <a
            target="_blank"
            className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-50 bg-zinc-700"
          >
            <FontAwesomeIcon className="w-4 h-4" icon={faLinkedinIn} />
          </a>
        </Link>
      )}
      {socialMedia.github && (
        <Link href={socialMedia.github}>
          <a
            target="_blank"
            className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-50 bg-zinc-700"
          >
            <FontAwesomeIcon className="w-4 h-4" icon={faGithubAlt} />
          </a>
        </Link>
      )}
    </div>
  );
};

export default ProfileSocialMedia;
