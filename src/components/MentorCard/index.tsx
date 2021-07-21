import { Mentor, Topic } from '../../lib/types';
import { faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import TopicBadge from '../TopicBadge';
import { motion } from 'framer-motion';

interface MentorCardProps {
  mentor: Mentor;
  topics: Topic[];
  isLogged: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  topics,
  isLogged,
}) => {
  const findTopicsName = (id: string) => {
    const topic = topics.find((e) => e._id == id);
    return topic.title;
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: mentor.isActive ? 1 : 0.66 }}
      exit={{ y: -100, opacity: 0 }}
      className="w-full col-span-1 my-2 bg-white border border-teal-100 rounded-lg shadow"
    >
      <div className="flex flex-col items-center w-full px-6 py-4 text-center md:flex-row md:text-left">
        <div className="flex flex-col items-center text-white md:mr-6">
          <img
            className="object-cover w-24 h-24 bg-gray-300 rounded-full"
            src={mentor.photo.src}
            alt={`${mentor.name} Avatar`}
          />
          <div className="flex mt-2 space-x-1">
            {mentor.web && (
              <Link href={mentor.web}>
                <a
                  target="_blank"
                  className="w-8 h-8 bg-pink-800 social-circle hover:bg-pink-700"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faGlobe} />
                </a>
              </Link>
            )}
            {mentor.linkedin && (
              <Link href={mentor.linkedin}>
                <a
                  target="_blank"
                  className="w-8 h-8 bg-blue-600 social-circle hover:bg-blue-700"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faLinkedinIn} />
                </a>
              </Link>
            )}
            {mentor.github && (
              <Link href={mentor.github}>
                <a
                  target="_blank"
                  className="w-8 h-8 bg-gray-800 social-circle hover:bg-gray-700"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faGithubAlt} />
                </a>
              </Link>
            )}
          </div>
        </div>
        <div className="flex-1 md:border-l md:pl-6">
          <div className="flex flex-col flex-grow items">
            <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
              <h2 className="text-2xl font-medium text-green-900 title-font">
                {mentor.name}
              </h2>
              {!isLogged ? null : mentor.isActive && mentor.calendly ? (
                <Link href={mentor.calendly}>
                  <a
                    target="_blank"
                    className="px-3 py-1 text-sm text-white uppercase rounded bg-primary hover:bg-teal-400 font-base"
                  >
                    <span>Contactame</span>
                  </a>
                </Link>
              ) : (
                <span className="px-3 py-1 text-sm text-white uppercase bg-gray-500 rounded cursor-not-allowed font-base">
                  No Disponible
                </span>
              )}
            </div>

            <span className="text-xs leading-relaxed md:min-h-64">
              {mentor.description ? mentor.description : '---'}
            </span>
            <div className="flex flex-wrap justify-center my-3 md:justify-start">
              {mentor.topics &&
                mentor.topics?.map((topic) => (
                  <TopicBadge
                    key={topic._key}
                    topic={findTopicsName(topic._ref)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCard;
