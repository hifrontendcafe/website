import {
  faGithub,
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
        (<Link
          href={socialMedia.twitter}
          target="_blank"
          className="flex items-center justify-center w-8 h-8 rounded-full text-primary bg-zinc-700">

          <FontAwesomeIcon className="w-4 h-4" icon={faTwitter} />

        </Link>)
      )}
      {socialMedia.web && (
        (<Link
          href={socialMedia.web}
          target="_blank"
          className="flex items-center justify-center w-8 h-8 rounded-full text-primary bg-zinc-700">

          <FontAwesomeIcon className="w-4 h-4 " icon={faGlobe} />

        </Link>)
      )}
      {socialMedia.linkedin && (
        (<Link
          href={socialMedia.linkedin}
          target="_blank"
          className="flex items-center justify-center w-8 h-8 rounded-full text-primary bg-zinc-700">

          <FontAwesomeIcon className="w-4 h-4" icon={faLinkedinIn} />

        </Link>)
      )}
      {socialMedia.github && (
        (<Link
          href={socialMedia.github}
          target="_blank"
          className="flex items-center justify-center w-8 h-8 rounded-full text-primary bg-zinc-700">

          <FontAwesomeIcon className="w-4 h-4" icon={faGithub} />

        </Link>)
      )}
    </div>
  );
};

export default ProfileSocialMedia;
