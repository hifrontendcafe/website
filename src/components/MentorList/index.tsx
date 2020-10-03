import MentorCard from '../MentorCard';

interface MentorListProps {
  title: string;
}

const MentorList: React.FC<MentorListProps> = ({ title }) => {
  return (
    <li className="flex align-center flex-col">
      <h4 className="px-5 py-3 bg-green-500 text-white inline-block rounded-t-lg">
        {title ? title : 'Otra cosa'}
      </h4>

      <div className="flex flex-wrap px-5 py-3">
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
      </div>
    </li>
  );
};

export default MentorList;
