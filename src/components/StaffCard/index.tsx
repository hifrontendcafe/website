import { imageBuilder } from '@/lib/sanity';
import { Person } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileProp {
  profile: Person;
  index: number;
}

const StaffCard: React.FC<ProfileProp> = ({ profile, index }) => {
  return (
    <li className="duration-250 relative text-center transition-transform ease-in focus-within:scale-110 hover:scale-110">
      {profile.photo && (
        <Image
          className="mx-auto h-32 w-32 rounded-full object-cover"
          src={imageBuilder.image(profile.photo).width(128).height(128).url()}
          alt={`Foto de ${profile.firstName}`}
          width={128}
          height={128}
          placeholder="blur"
          priority={index < 10}
          blurDataURL={imageBuilder.image(profile.photo).height(50).url()}
        />
      )}
      <Link
        className="after:absolute after:inset-0 after:content-['']"
        href={profile.linkedin ?? ''}
        target="_blank"
        rel="noreferrer"
      >
        <h2 className="my-2 font-semibold">
          {profile.firstName} {profile.lastName}
        </h2>
      </Link>
    </li>
  );
};

export default StaffCard;
