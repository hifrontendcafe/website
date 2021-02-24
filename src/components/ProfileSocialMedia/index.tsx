type Props = {
  socialMedia: SocialMedia;
};

type SocialMedia = {
  [name: string]: string;
};

const ProfileSocialMedia = ({ socialMedia }: Props) => {
  return (
    <div className="mt-8 flex items-center space-x-4">
      {Object.keys(socialMedia).map((value) => (
        <a
          key={value}
          className="hover:opacity-75 bg-gray-600 text-white font-bold rounded-full px-3 py-2 capitalize"
          href={socialMedia[value]}
        >
          {value}
        </a>
      ))}
    </div>
  );
};

export default ProfileSocialMedia;
