interface TopicBadgeProps {
  topic: string;
}

const TopicBadge: React.FC<TopicBadgeProps> = ({ topic }) => {
  return (
    <span className="px-3 py-1 mt-2 mr-2 text-xs uppercase break-all bg-gray-700 rounded-md text-gray-50">
      {topic}
    </span>
  );
};

export default TopicBadge;
