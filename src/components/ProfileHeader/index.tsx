
import ProfileSocialMedia from '../ProfileSocialMedia';

type Props = {
  name: string;
  coverImage: string;
  role: string;
  socialMedia: {
    [name: string]: string;
  }
};

const ProfileHeader = ({ name, coverImage, role, socialMedia }: Props) => {
  return (
    <div className="md:flex items-center">
      <img
        src={coverImage}
        className="w-32 h-32 rounded-full mr-4 object-cover shadow-lg border-2 border-white"
        alt={name}
      />
      <div>
        <h1 className="mb-0 text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:leading-none">
          {name}
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 tracking-wide leading-none">
          {role}
        </h2>

        <ProfileSocialMedia socialMedia={socialMedia} />
      </div>
    </div>
  );
};

export default ProfileHeader;
