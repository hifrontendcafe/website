interface TopicBadgeProps {
  topic: string;
}

const TopicBadge: React.FC<TopicBadgeProps> = ({ topic }) => {
  let textColor = 'text-gray-800';
  let bgColor = 'bg-gray-200';

  // Color by type of topic.
  const work = ['Orientación / CV'];
  const frontend = ['Frontend','Diseño UX-UI'];
  const backend = ['Backend'];
  const data = ['Anilitica Web / App', 'Data Science / Data Engineer'];
  const programming = ['Diseño y Arquitectura de Software', 'Intro a la Programación' ];
  const languages = ['Inglés'];
  const tools = ['Git'];

  if (frontend.includes(topic)) {
    textColor = 'text-red-800';
    bgColor = 'bg-red-200';
  }

  if (data.includes(topic)) {
    textColor = 'text-indigo-800';
    bgColor = 'bg-indigo-200';
  }

  if (backend.includes(topic)) {
    textColor = 'text-teal-800';
    bgColor = 'bg-teal-200';
  }

  if (work.includes(topic)) {
    textColor = 'text-green-800';
    bgColor = 'bg-green-200';
  }

  if (programming.includes(topic)) {
    textColor = 'text-yellow-800';
    bgColor = 'bg-yellow-200';
  }

  if (tools.includes(topic)) {
    textColor = 'text-purple-800';
    bgColor = 'bg-purple-200';
  }

  if (languages.includes(topic)) {
    textColor = 'text-orange-800';
    bgColor = 'bg-orange-200';
  }

  return (
    <span
      className={`m-1 inline-flex items-center px-2 py-1 rounded text-xs font-medium leading-4 ${bgColor} ${textColor}`}
    >
      {topic}
    </span>
  );
};

export default TopicBadge;
