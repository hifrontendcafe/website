import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Mentor, Topic } from '../../lib/types';
import TopicBadge from '../TopicBadge';
import AnimatedContainer from './AnimatedContainer';
import BookButton from './BookButton';
import CopyName from './CopyName';

interface MentorCardProps {
  mentor: Mentor;
  topics: Topic[];
  // canBookAMentorship: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  topics,
  // canBookAMentorship,
}) => {
  const findTopicsName = (id: string) => {
    const topic = topics.find((e) => e._id == id);
    return topic.title;
  };

  return (
    <AnimatedContainer mentor={mentor}>
      <div>
        <div className="flex justify-between w-full">
          <div>
            <Image
              className="object-cover w-24 h-24 mr-4 rounded-full bg-zinc-300"
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
              <BookButton mentor={mentor} />
            </div>
            <div className="flex mt-2 place-content-end">
              {mentor.web && (
                <Link
                  href={mentor.web}
                  target="_blank"
                  className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                >
                  <FontAwesomeIcon className="w-4 h-4 " icon={faGlobe} />
                </Link>
              )}
              {mentor.linkedin && (
                <Link
                  href={mentor.linkedin}
                  target="_blank"
                  className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faLinkedinIn} />
                </Link>
              )}
              {mentor.github && (
                <Link
                  href={mentor.github}
                  target="_blank"
                  className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faGithub} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <CopyName mentor={mentor} />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex">
          <div>
            <p className="leading-relaxed text-md text-tertiary md:min-h-64">
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
    </AnimatedContainer>
  );
};

export default MentorCard;
