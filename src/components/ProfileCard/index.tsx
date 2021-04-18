import Link from 'next/link';
import { Profile } from '../../lib/types';

type Props = {
  profile: Profile;
};

const ProfileCard = ({ profile }: Props) => {
  return (
    <Link href={`/perfiles/${profile.slug}`}>
      <a>
        <div className="p-2 py-4 text-center transition-transform duration-200 transform border-b-4 rounded-lg shadow-md hover:scale-105">
          <img
            src={profile.coverImage}
            className="object-cover object-top w-24 h-24 mx-auto border rounded-full"
            alt={profile.name}
          />
          {profile.availableForWork && (
            <div className="p-2 font-semibold text-center text-primary">
              En búsqueda activa
            </div>
          )}
          <h1 className="text-lg font-bold leading-tight tracking-tighter md:text-xl md:leading-none">
            {profile.name}
          </h1>
          <h2 className="font-bold tracking-wide text-gray-500">
            {profile.role}
          </h2>
          {profile.stack?.length > 0 && (
            <ul className="flex flex-wrap items-center justify-center">
              {profile.stack.slice(0, 3)?.map((tech) => (
                <li
                  key={tech}
                  className="px-4 py-1 mt-2 ml-2 text-sm text-white break-all bg-indigo-400 rounded-md"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      </a>
    </Link>
  );
};

export default ProfileCard;
