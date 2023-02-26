import { imageBuilder } from '@/lib/sanity';
import { Person } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileProp {
  profile: Person;
  index: number;
}

const ProfileImage = ({ profile, index }: ProfileProp) => {
  return (
    <Image
      className="object-cover mx-auto rounded-full h-36 w-36 md:h-32 md:w-32"
      src={imageBuilder.image(profile.photo).width(200).height(200).url()}
      alt={`Foto de ${profile.firstName}`}
      width={128}
      height={128}
      placeholder="blur"
      priority={index < 10}
      blurDataURL={imageBuilder.image(profile.photo).height(50).url()}
    />
  );
};

const ProfileText = ({ profile }: Omit<ProfileProp, 'index'>) => {
  return (
    <h2 className="my-2 text-3xl font-semibold md:text-sm">
      {profile.firstName} {profile.lastName}
    </h2>
  );
};

const StaffCard: React.FC<ProfileProp> = ({ profile, index }) => {
  return (
    <div className="p-2 text-center transition duration-500 ease-in-out scale-100 hover:scale-110">
      {profile.linkedin ? (
        <Link href={profile.linkedin ?? ''} target="_blank" rel="noreferrer">
          {profile.photo && <ProfileImage index={index} profile={profile} />}
          <ProfileText profile={profile} />
        </Link>
      ) : (
        <>
          {profile.photo && <ProfileImage index={index} profile={profile} />}
          <ProfileText profile={profile} />
        </>
      )}
    </div>
  );
};

export default StaffCard;
