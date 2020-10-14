import { Mentor, Topic } from '../../lib/types';
import {
  faGithub,
  faGithubAlt,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import TopicBadge from '../TopicBadge';

interface MentorCardProps {
  mentor: Mentor;
  topics: Topic[];
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, topics }) => {

  const findTopicsName = (id: string) => {
    const topic = topics.find(e => e._id == id)
    return topic.title;
  }

  return (
    <div className="w-full">
      <div className="col-span-1 bg-white rounded-lg shadow my-2 border border-teal-200">
        <div className="w-full flex items-center flex-col md:flex-row px-6 py-4 text-center md:text-left">
          <div className="flex flex-col items-center md:mr-6 text-white">
            <img
              className="w-24 h-24 bg-gray-300 rounded-full"
              src={mentor.photo.src}
              alt={`${mentor.name} Avatar`}
            />
            <div className="flex mt-2 space-x-1">
              {mentor.web && (
                <Link href={mentor.web}>
                  <a
                    target="_blank"
                    className="grid place-items-center h-8 w-8 rounded-full  bg-pink-800 hover:bg-pink-700"
                  >
                    <FontAwesomeIcon icon={faGlobe} />
                  </a>
                </Link>
              )}
              {mentor.linkedin && (
                <Link href={mentor.linkedin}>
                  <a
                    target="_blank"
                    className="grid place-items-center h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </Link>
              )}
              {mentor.github && (
                <Link href={mentor.github}>
                  <a
                    target="_blank"
                    className="grid place-items-center h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700"
                  >
                    <FontAwesomeIcon icon={faGithubAlt} />
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1 md:border-l md:pl-6">
            <div className="flex flex-col items  flex-grow">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl text-green-900 font-medium title-font">
                  {mentor.name}
                </h2>
                {mentor.calendly && (
                  <Link href={mentor.calendly}>
                    <a
                      target="_blank"
                      className="text-white bg-teal-500 hover:bg-teal-400 font-base text-sm py-1 px-3 rounded"
                    >
                      <span>CONTACTAME</span>
                    </a>
                  </Link>
                )}
              </div>

              <span className="leading-relaxed text-xs">
                {(mentor.description) ? mentor.description : '---'}
              </span>
              <div className="flex flex-wrap my-3 justify-center md:justify-start">
                {mentor.topics && mentor.topics.map(topic => <TopicBadge key={topic._key} topic={findTopicsName(topic._ref)} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
