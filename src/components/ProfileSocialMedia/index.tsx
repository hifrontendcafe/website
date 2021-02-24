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
          className="hover:underline bg-green-600 text-white rounded-lg px-2 py-2"
          href={socialMedia[value]}
        >
          {value}
        </a>
      ))}
    </div>
  );
};

export default ProfileSocialMedia;
