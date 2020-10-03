import MentorList from '../MentorList';

interface MentorContainerProps {
  title: string;
}

const MentorContainer: React.FC<MentorContainerProps> = ({ title }) => {
  return (
    <ul className="block">
      <MentorList title="Backend" />
      <MentorList title={title} />
      <MentorList title={title} />
      <MentorList title={title} />
    </ul>
  );
};

export default MentorContainer;
