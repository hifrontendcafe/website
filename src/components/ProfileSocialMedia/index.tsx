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
    <div className="flex items-center space-x-2">
      {Object.keys(socialMedia)?.map(
        (value) =>
          !invalidSocialNetworks[value] && (
            <a
              key={value}
              className="hover:opacity-75 bg-gray-600 rounded-full p-1 w-5 h-5 flex items-center"
              href={socialMedia[value]}
            >
              <Image
                src={`/img/${value}.svg`}
                onErrorCapture={() => onImageError(value)}
                onError={() => onImageError(value)}
                alt={value}
                width={12}
                height={12}
              />
            </a>
          ),
      )}
    </div>
  );
};

export default ProfileSocialMedia;
