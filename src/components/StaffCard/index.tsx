import { Person } from '../../lib/types';

type Props = {
  profile: Person;
};

const StaffCard = ({ profile }: Props) => {
  return (
    <div className="p-5 text-center">
      {profile.photo.src && (
        <img
          height={56}
          width={56}
          className="rounded-full mx-auto h-32 w-32 object-cover"
          src={profile.photo.src}
          alt={profile.firstName}
        />
      )}

      <h2 className="mt-2 font-semibold">
        {profile.firstName} {profile.lastName}
      </h2>
    </div>
  );
};

export default StaffCard;
