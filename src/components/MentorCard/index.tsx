import { Mentor, Topic } from '../../lib/types';
import { faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
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
      className="flex flex-col w-full p-6 rounded-lg bg-gray-800 space-between "
    >
      <div>
        <div className="flex justify-between w-full">
          <div>
            <Image
              className="object-cover w-24 h-24 mr-4 rounded-full bg-gray-300"
              src={`${mentor.photo.src}?h=200`}
              alt={`Foto de ${mentor.name} `}
              height={96}
              width={96}
              placeholder="blur"
              blurDataURL={`${mentor.photo.src}?h=50`}
            />
          </div>

          <div>
            <div className="mb-4">
              {!mentor.isActive ? (
                <button
                  type="button"
                  className="capitalize cursor-not-allowed text-md btn btn-secondary"
                >
                  No disponible
                </button>
              ) : mentor.isActive && mentor.calendly && isLogged ? (
                <Link href={mentor.calendly}>
                  <a
                    target="_blank"
                    className="capitalize border text-md text-gray-50 border-gray-50 btn hover:text-gray-800 hover:bg-gray-50 hover:border-gray-50"
                  >
                    <span>Solicitar mentoría</span>
                  </a>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openModal()}
                  className=" border text-md text-gray-50 border-gray-50 btn hover:text-gray-800 hover:bg-gray-50 hover:border-gray-50"
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
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-gray-50 bg-gray-700"
                  >
                    <FontAwesomeIcon className="w-4 h-4 " icon={faGlobe} />
                  </a>
                </Link>
              )}
              {mentor.linkedin && (
                <Link href={mentor.linkedin}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-gray-50 bg-gray-700"
                  >
                    <FontAwesomeIcon className="w-4 h-4" icon={faLinkedinIn} />
                  </a>
                </Link>
              )}
              {mentor.github && (
                <Link href={mentor.github}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-gray-50 bg-gray-700"
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
        <h2 className="mb-2 text-xl font-bold text-gray-50">{mentor.name}</h2>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex">
          <div>
            <p className="leading-relaxed text-md text-gray-300 md:min-h-64">
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
