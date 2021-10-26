import { useState } from 'react';

import Image from 'next/image';
type Props = {
  socialMedia: SocialMedia;
};

type SocialMedia = {
  [name: string]: string;
};

const ProfileSocialMedia: React.FC<Props> = ({ socialMedia }) => {
  const [invalidSocialNetworks, setInvalidSocialNetworks] = useState({});
  const onImageError = (value: string) => {
    setInvalidSocialNetworks({ ...invalidSocialNetworks, [value]: true });
  };
  return (
    <div className="flex items-center space-x-1">
      {Object.keys(socialMedia)?.map(
        (value) =>
          !invalidSocialNetworks[value] && (
            <a
              key={value}
              className="flex items-center justify-center w-6 h-6 rounded-full hover:opacity-75 bg-coolGray-600"
              href={socialMedia[value]}
            >
              <Image
                src={`/img/${value}.svg`}
                onErrorCapture={() => onImageError(value)}
                onError={() => onImageError(value)}
                alt={value}
                width={14}
                height={14}
              />
            </a>
          ),
      )}
    </div>
  );
};

export default ProfileSocialMedia;
