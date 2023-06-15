import { Profile } from '@/lib/types';
import Image from 'next/image';
import SocialMediaLinks from '../SocialMediaLinks';

type Props = {
  profile: Profile;
};

const ProfileCard: React.FC<Props> = ({ profile }) => {
  // TODO: Check why "email", "portfolio" aren't rendering
  // const socialMediaList = {
  //   ...(profile.person.email && { email: 'mailto:' + profile.person.email }),
  //   ...(profile.person.linkedin && { linkedin: profile.person.linkedin }),
  //   ...(profile.person.github && { github: profile.person.github }),
  //   ...(profile.person.twitter && { twitter: profile.person.twitter }),
  //   ...(profile.person.portfolio && { portfolio: profile.person.portfolio }),
  // };

  return (
    <li className="relative flex max-w-3xl flex-col justify-between gap-4 rounded-lg bg-zinc-800 py-3 shadow-lg md:py-6">
      <div className="px-3 md:px-6 ">
        <Image
          src={profile.person.photo || '/img/user.svg'}
          width={112}
          height={112}
          className={`m-1 h-28 w-28 rounded-full object-cover object-top shadow-lg ${
            profile.isAvailable ? 'ring ring-profileRing' : ''
          }`}
          alt={profile.person.firstName}
        />
      </div>
      <div className="px-3 md:px-6">
        <h3 className="text-xl font-bold">{profile.person.firstName}</h3>
        <p className="flex gap-2">
          <span className="text-md font-semibold">{profile.role.name}</span>
          <span className="text-md">|&nbsp;{profile.seniority.name}</span>
        </p>

        {profile.location && (
          <p className="text-base capitalize ">{profile.location}</p>
        )}
      </div>
      <SocialMediaLinks className="px-3 md:px-6" socialMedia={profile.person} />
      <p className="flex-grow whitespace-pre-line px-3 text-sm leading-tight text-zinc-100 md:px-6">
        {profile.description}
      </p>
      {profile.technologies?.length > 0 && (
        <ul className="flex flex-wrap gap-2 px-3 md:px-6">
          {profile.technologies?.map((tech) => (
            <li
              key={tech._id}
              className="break-all rounded-md bg-zinc-900 px-3 py-1 text-xs uppercase"
            >
              {tech.name}
            </li>
          ))}
        </ul>
      )}
      {profile.isAvailable && (
        <div className="bottom-4 bg-greenFec py-1 text-center text-sm font-semibold text-zinc-900">
          En búsqueda activa
        </div>
      )}
    </li>
  );
};

export default ProfileCard;
