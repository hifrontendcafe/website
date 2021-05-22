import { Person } from '../../lib/types';

type Props = {
  profile: Person;
};

const StaffCard = ({ profile }: Props) => {
  return (
    <div className="p-5 text-center transition duration-500 ease-in-out transform scale-100 hover:scale-110">
      <a href={profile.linkedin} target="_blank" rel="noreferrer">
        {profile.photo.src && (
          <img
            className="rounded-full mx-auto sm:h-36 sm:w-36 md:h-32 md:w-32 object-cover"
            src={profile.photo.src}
            alt={profile.firstName}
          />
        )}

        <h2 className="mt-2 font-semibold">
          {profile.firstName} {profile.lastName}
        </h2>
      </a>
    </div>
  );
};

export default StaffCard;
