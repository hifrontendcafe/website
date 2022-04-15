import { Profile } from '@/lib/types';
import ProfileSocialMedia from '../ProfileSocialMedia';

type Props = {
  profile: Profile;
};

const ProfileCard: React.FC<Props> = ({ profile }) => {
  const socialMediaList = {
    ...(profile.person.email && { email: 'mailto:' + profile.person.email }),
    ...(profile.person.linkedin && { linkedin: profile.person.linkedin }),
    ...(profile.person.github && { github: profile.person.github }),
    ...(profile.person.twitter && { twitter: profile.person.twitter }),
    ...(profile.person.portfolio && { portfolio: profile.person.portfolio }),
  };

  return (
    <div className="flex flex-col justify-between w-full pb-4 rounded-lg shadow-lg bg-zinc-800">
      <div className="px-3 pt-3 md:pt-6 md:px-6">
        <div className="space-x-3 items-top">
          <img
            src={profile.person.photo || '/img/user.svg'}
            className={`object-cover object-top w-28 h-28  ${
              profile.isAvailable ? ' ring ring-profileRing' : ''
            } rounded-full shadow-lg`}
            alt={profile.person.firstName}
          />
        </div>
        <div className="flex flex-col justify-between grow text-primary">
          <div className="grow">
            <h2 className="mt-2 text-xl font-bold">
              {profile.person.firstName}
            </h2>
            <div className="flex">
              <h2 className="mr-2 font-semibold text-md">
                {profile.role.name}
              </h2>
              <h2 className="text-md">|&nbsp;{profile.seniority.name}</h2>
            </div>

            {profile.location && (
              <div className="flex items-center">
                <h2 className="text-base capitalize ">{profile.location}</h2>
              </div>
            )}
          </div>
          <div className="mt-2 flex-end">
            <ProfileSocialMedia socialMedia={socialMediaList} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mt-4 mb-2 text-sm leading-tight whitespace-pre-line text-zinc-100">
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
                  key={tech._id}
                  className="px-3 py-1 mt-2 mr-2 text-xs uppercase break-all rounded-md bg-zinc-900 text-primary"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}
        </div>
        {profile.isAvailable && (
          <div className="w-full py-1 mt-4 text-sm font-semibold text-center text-zinc-900 bg-greenFec">
            En búsqueda activa
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
