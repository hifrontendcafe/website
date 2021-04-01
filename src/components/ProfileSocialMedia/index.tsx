import { useState } from 'react';

import Image from 'next/image';
type Props = {
  socialMedia: SocialMedia;
};

type SocialMedia = {
  [name: string]: string;
};

const ProfileSocialMedia = ({ socialMedia }: Props) => {
  const [invalidSocialNetworks, setInvalidSocialNetworks] = useState({});
  const onImageError = (value: string) => {
    setInvalidSocialNetworks({ ...invalidSocialNetworks, [value]: true });
  };
  return (
    <div className="mt-2 flex items-center space-x-2">
      {Object.keys(socialMedia)?.map(
        (value) =>
          !invalidSocialNetworks[value] && (
            <a
              key={value}
              className="hover:opacity-75 bg-gray-600 rounded-full p-2 w-10 h-10"
              href={socialMedia[value]}
            >
              <Image
                src={`/img/${value}.svg`}
                onErrorCapture={() => onImageError(value)}
                onError={() => onImageError(value)}
                alt={value}
                width={24}
                height={24}
              />
            </a>
          ),
      )}
    </div>
  );
};

export default ProfileSocialMedia;
