import { Mentor } from '../../lib/types';
import MentorCard from '../MentorCard';

interface MentorListProps {
  mentors: Mentor[];
}

const MentorList: React.FC<MentorListProps> = ({ mentors }) => {
  return (
    <li className="flex align-center flex-col">
      <div className="flex flex-wrap px-5 py-3">
      {mentors.map((mentor) => (
        <MentorCard mentor={mentor}/>
      ))}
      </div>
    </li>
  );
};

export default MentorList;
