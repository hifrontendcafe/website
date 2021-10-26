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
    <div className="flex flex-col justify-between w-full pb-4 rounded-lg shadow-lg bg-coolGray-800">
      <div className="p-3 md:p-6">
        <div className="space-x-3 items-top">
          <img
            src={profile.photo || '/img/user.svg'}
            className={`object-cover object-top w-28 h-28 ring ring-gray-300 ${
              profile.available ? 'ring-profileRing' : ''
            } rounded-full shadow-lg`}
            alt={profile.name}
          />
        </div>
        <div className="flex flex-col justify-between flex-grow text-coolGray-50">
          <div className="flex-grow">
            <h1 className="mt-2 text-xl font-bold leading-none tracking-tighter">
              {profile.name}
            </h1>
            <h2 className="leading-none tracking-tighter">
              {profile.role.name}
            </h2>
            <h3 className="my-1 text-xs font-semibold leading-none tracking-tighter">
              {profile.seniority.name}
            </h3>
            {profile.location && (
              <div className="flex items-center">
                <h3 className="text-xs font-semibold uppercase tracking-witde">
                  {profile.location}
                </h3>
              </div>
            )}
          </div>
          <div className="mt-2 flex-end">
            <ProfileSocialMedia socialMedia={socialMediaList} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="my-4 text-sm text-coolGray-100 whitespace-pre-line ">
            {profile.description}
          </div>
        </div>
      </div>
      <div>
        <div className="px-3 md:px-6">
          {profile.technologies?.length > 0 && (
            <div className="flex flex-wrap items-center justify-start">
              {profile.technologies?.map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1 mt-2 mr-2 text-xs uppercase break-all rounded-md bg-coolGray-900 text-coolGray-50"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}
        </div>
        {profile.available && (
          <div className="w-full py-1 mt-4 text-sm font-semibold text-center text-coolGray-900 bg-greenFec">
            En búsqueda activa
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
