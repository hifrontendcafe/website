import { Profile } from '../../lib/types';
import ProfileSocialMedia from '../ProfileSocialMedia';

type Props = {
  profile: Profile;
};

const ProfileCard: React.FC<Props> = ({ profile }: Props) => {
  const socialMediaList = {
    ...(profile.email && { email: 'mailto:' + profile.email }),
    ...(profile.linkedin && { linkedin: profile.linkedin }),
    ...(profile.github && { github: profile.github }),
    ...(profile.twitter && { twitter: profile.twitter }),
    ...(profile.portfolio && { portfolio: profile.portfolio }),
  };

  return (
    <div className="p-4 text-center rounded-lg shadow-lg flex flex-col justify-between">
      <div className="flex items-top justify-center space-x-3 text-center">
        <img
          src={profile.image || '/img/user.svg'}
          className={`object-cover object-top w-28 h-28 ring ring-white ${
            profile.available ? 'ring-green-400' : ''
          } rounded-full shadow-lg`}
          alt={profile.name}
        />
        <div className="text-left flex justify-between flex-nowrap w-min flex-grow flex-col">
          <div className="flex-grow">
            <h1 className="leading-none text-xl font-bold tracking-tighter">
              {profile.name}
            </h1>
            <h2 className="leading-none tracking-tighter">{profile.role}</h2>
            {profile.available && (
              <div className="font-semibold text-sm text-primary whitespace-nowrap">
                En búsqueda activa
              </div>
            )}
          </div>
          <div className="mt-2 flex-end">
            <ProfileSocialMedia socialMedia={socialMediaList} />
          </div>
        </div>
      </div>
      <div className="text-left text-sm w-full h-full items-center justify-center my-4 whitespace-pre-line">
        {profile.description}
      </div>
      <div className="group-hover:hidden">
        {profile.technologies?.length > 0 && (
          <ul className="flex flex-wrap items-center justify-start">
            {profile.technologies?.map((tech) => (
              <li
                key={tech}
                className="px-3 py-1 mr-2 mt-2 text-xs break-all border border-indigo-400 rounded-md"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
