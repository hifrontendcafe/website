import ProfileSocialMedia from '../ProfileSocialMedia';

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
        className="object-cover w-32 h-32 mr-4 border-2 border-white rounded-full shadow-lg"
        alt={name}
      />
      <div>
        <h1 className="mb-0 text-4xl font-bold leading-tight tracking-tighter md:text-5xl md:leading-none">
          {name}
        </h1>
        <h2 className="text-2xl font-bold leading-none tracking-wide text-gray-700 md:text-3xl">
          {role}
        </h2>

        <ProfileSocialMedia socialMedia={socialMedia} />
      </div>
    </div>
  );
};

export default ProfileHeader;
