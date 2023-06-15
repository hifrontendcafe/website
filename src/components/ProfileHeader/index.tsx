import SocialMediaLinks from '../SocialMediaLinks';

interface ProfileHeaderProps {
  name: string;
  coverImage: string;
  role: string;
  socialMedia: {
    [name: string]: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  coverImage,
  role,
  socialMedia,
}) => {
  return (
    <div className="items-center md:flex">
      <img
        src={coverImage}
        className="mr-4 h-32 w-32 rounded-full border-2 border-white object-cover shadow-lg"
        alt={name}
      />
      <div>
        <h1 className="tracking-tighter mb-0 text-4xl font-bold leading-tight md:text-5xl md:leading-none">
          {name}
        </h1>
        <h2 className="tracking-wide text-2xl font-bold leading-none text-zinc-700 md:text-3xl">
          {role}
        </h2>

        <SocialMediaLinks socialMedia={socialMedia} />
      </div>
    </div>
  );
};

export default ProfileHeader;
