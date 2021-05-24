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
            className="object-cover mx-auto rounded-full md:h-32 md:w-32"
            src={profile.photo.src}
            alt={profile.firstName}
          />
        )}

        <h2 className="my-2 text-3xl font-semibold md:text-sm">
          {profile.firstName} {profile.lastName}
        </h2>
      </a>
    </div>
  );
};

export default StaffCard;
