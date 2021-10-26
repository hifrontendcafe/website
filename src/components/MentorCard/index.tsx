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
  openModal: () => void;
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  topics,
  isLogged,
  openModal,
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
      className="flex flex-col w-full p-6 rounded-lg bg-coolGray-800 space-between "
    >
      <div>
        <div className="flex justify-between w-full">
          <div>
            <img
              className="object-cover w-24 h-24 mr-4 rounded-full bg-coolGray-300"
              src={`${mentor.photo.src}?h=200`}
              alt={`${mentor.name} Avatar`}
            />
          </div>

          <div>
            <div className="mb-4">
              {!mentor.isActive ? (
                <button className="text-xs uppercase cursor-not-allowed btn btn-secondary">
                  No Disponible
                </button>
              ) : mentor.isActive && mentor.calendly && isLogged ? (
                <Link href={mentor.calendly}>
                  <a
                    target="_blank"
                    className="text-xs uppercase border text-coolGray-50 border-coolGray-50 btn hover:text-coolGray-800 hover:bg-coolGray-300 hover:border-coolGray-300"
                  >
                    <span>Solicitar mentoría</span>
                  </a>
                </Link>
              ) : (
                <button
                  onClick={() => openModal()}
                  className="text-xs uppercase border text-coolGray-50 border-coolGray-50 btn hover:text-coolGray-800 hover:bg-coolGray-300 hover:border-coolGray-300gi"
                >
                  Solicitar mentoría
                </button>
              )}
            </div>
            <div className="flex mt-2 place-content-end">
              {mentor.web && (
                <Link href={mentor.web}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-coolGray-50 bg-coolGray-700"
                  >
                    <FontAwesomeIcon className="w-4 h-4 " icon={faGlobe} />
                  </a>
                </Link>
              )}
              {mentor.linkedin && (
                <Link href={mentor.linkedin}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-coolGray-50 bg-coolGray-700"
                  >
                    <FontAwesomeIcon className="w-4 h-4" icon={faLinkedinIn} />
                  </a>
                </Link>
              )}
              {mentor.github && (
                <Link href={mentor.github}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-coolGray-50 bg-coolGray-700"
                  >
                    <FontAwesomeIcon className="w-4 h-4" icon={faGithubAlt} />
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-xl font-bold text-coolGray-50">
          {mentor.name}
        </h2>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex">
          <div>
            <p className="text-xs leading-relaxed text-coolGray-100 md:min-h-64">
              {mentor.description ? mentor.description : '---'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mt-4 md:justify-start">
          {mentor.topics &&
            mentor.topics?.map((topic) => (
              <TopicBadge key={topic._key} topic={findTopicsName(topic._ref)} />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCard;
