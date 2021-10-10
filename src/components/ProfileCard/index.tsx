import { ExtendedProfile } from '@/lib/types';
import ProfileSocialMedia from '../ProfileSocialMedia';

type Props = {
  profile: ExtendedProfile;
};

const ProfileCard: React.FC<Props> = ({ profile }) => {
  const socialMediaList = {
    ...(profile.email && { email: 'mailto:' + profile.email }),
    ...(profile.linkedin && { linkedin: profile.linkedin }),
    ...(profile.github && { github: profile.github }),
    ...(profile.twitter && { twitter: profile.twitter }),
    ...(profile.portfolio && { portfolio: profile.portfolio }),
  };

  return (
    <div className="flex flex-col justify-between w-full p-6 text-center bg-gray-800 border-2 border-gray-500 rounded-lg shadow-lg">
      <div className="flex justify-center space-x-3 text-center items-top">
        <img
          src={profile.photo || '/img/user.svg'}
          className={`object-cover object-top w-28 h-28 ring ring-gray-300 ${
            profile.available ? 'ring-primary' : ''
          } rounded-full shadow-lg`}
          alt={profile.name}
        />
        <div className="flex flex-col justify-between flex-grow text-left text-gray-50 flex-nowrap w-min">
          <div className="flex-grow">
            <h1 className="text-xl font-bold leading-none tracking-tighter">
              {profile.name}
            </h1>
            <h2 className="leading-none tracking-tighter">
              {profile.role.name}
            </h2>
            <h3 className="my-1 text-xs font-semibold leading-none tracking-tighter uppercase">
              {profile.seniority.name}
            </h3>
            {profile.location && (
              <div className="flex items-center">
                <img
                  src="img/location.svg"
                  alt="location"
                  height={16}
                  width={16}
                />
                <h3 className="text-xs font-semibold uppercase tracking-witde">
                  {profile.location}
                </h3>
              </div>
            )}
            {profile.available && (
              <div className="text-sm font-semibold text-primary whitespace-nowrap">
                En búsqueda activa
              </div>
            )}
          </div>
          <div className="mt-2 flex-end">
            <ProfileSocialMedia socialMedia={socialMediaList} />
          </div>
        </div>
      </div>
      <div className="items-center justify-center w-full h-full my-4 text-sm text-left text-gray-100 whitespace-pre-line">
        {profile.description}
      </div>
      <div className="group-hover:hidden">
        {profile.technologies?.length > 0 && (
          <div className="flex flex-wrap items-center justify-start">
            {profile.technologies?.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1 mt-2 mr-2 text-xs uppercase break-all border border-gray-300 rounded-md text-gray-50"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
