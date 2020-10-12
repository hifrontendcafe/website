import { Mentor, Topic } from '../../lib/types';
import MentorCard from '../MentorCard';

interface MentorListProps {
  mentors: Mentor[];
  topics: Topic[];
}

const MentorList: React.FC<MentorListProps> = ({ mentors, topics }) => {
  
  return (
    <li className="flex align-center flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {mentors.map((mentor, index) => (
        <MentorCard key={index} mentor={mentor}/>
      ))}
      </div>
    </li>
  );
};

export default MentorList;
