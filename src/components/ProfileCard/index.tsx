import Link from 'next/link';
import { Profile } from '../../lib/types';

type Props = {
  profile: Profile;
};

const ProfileCard = ({ profile }: Props) => {
  return (
    <Link href={`/perfiles/${profile.slug}`}>
      <a>
        <div className="p-2 py-4 shadow-md rounded-lg text-center border-b-4 transform hover:scale-105 transition-transform duration-200">
          <img
            src={profile.coverImage}
            className="mx-auto h-24 w-24 object-cover object-top rounded-full border"
            alt={profile.name}
          />
          {profile.availableForWork && (
            <div className="p-2 font-semibold text-primary text-center ">
              En búsqueda activa
            </div>
          )}
          <h1 className="text-lg md:text-xl font-bold tracking-tighter leading-tight md:leading-none">
            {profile.name}
          </h1>
          <h2 className="font-bold text-gray-500 tracking-wide">
            {profile.role}
          </h2>
          {profile.stack && profile.stack.length > 0 && (
            <div className="flex items-center flex-wrap justify-center">
              {profile.stack.slice(0, 3).map((tech) => (
                <div key={tech} className="px-4 py-1 mt-2 ml-2 text-sm rounded-md bg-indigo-400 text-white break-all">
                  {tech}
                </div>
              ))}
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default ProfileCard;
