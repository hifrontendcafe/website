import { Person } from '../../lib/types';

type Props = {
  profile: Person;
};

const StaffCard = ({ profile }: Props) => {
  return (  
    <div className="p-5 text-center">
      {
        profile.photo.src && <img className='rounded-full' src={profile.photo.src} alt={profile.firstName} />
      }

      
      
      <h1 className="mt-2 font-semibold">{profile.firstName}</h1>
    </div>   
  );
};

export default StaffCard;
