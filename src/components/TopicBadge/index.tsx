import { topics } from './constants';

const {
  ui,
  backend,
  english,
  analytics,
  frontend,
  git,
  data,
  architect,
  cv,
  intro,
} = topics;

interface TopicBadgeProps {
  topic: string;
}

const TopicBadge: React.FC<TopicBadgeProps> = ({ topic }) => {
  const colors = {
    [cv]: { textColor: 'text-green-800', bgColor: 'bg-green-200' },
    [frontend]: { textColor: 'text-red-800', bgColor: 'bg-red-200' },
    [ui]: { textColor: 'text-red-800', bgColor: 'bg-red-200' },
    [backend]: { textColor: 'text-green-800', bgColor: 'bg-green-200' },
    [analytics]: { textColor: 'text-pink-800', bgColor: 'bg-pink-200' },
    [data]: { textColor: 'text-pink-800', bgColor: 'bg-pink-200' },
    [architect]: { textColor: 'text-indigo-800', bgColor: 'bg-indigo-200' },
    [intro]: { textColor: 'text-indigo-800', bgColor: 'bg-indigo-200' },
    [english]: { textColor: 'text-yellow-800', bgColor: 'bg-yellow-200' },
    [git]: { textColor: 'text-violet-800', bgColor: 'bg-violet-200' },
  };

  const defaultColor = { textColor: 'text-gray-800', bgColor: 'bg-gray-200' };

  const { bgColor, textColor } = colors[topic] ?? defaultColor;

  return (
    <span
      className={`m-1 inline-flex items-center px-2 py-1 rounded text-xs font-medium leading-4 ${bgColor} ${textColor}`}
    >
      {topic}
    </span>
  );
};

export default TopicBadge;
