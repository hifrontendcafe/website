interface TopicBadgeProps {
  topic: string;
}

const TopicBadge: React.FC<TopicBadgeProps> = ({ topic }) => {
  return (
    <li className="max-w-fit break-all rounded-md bg-zinc-900 px-3 py-1 text-xs uppercase">
      {topic}
    </li>
  );
};

export default TopicBadge;
