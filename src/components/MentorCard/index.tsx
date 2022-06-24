import { Mentor, Topic } from '../../lib/types';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import TopicBadge from '../TopicBadge';
import { motion } from 'framer-motion';
import { getNameForId } from '../../lib/mentors';
import ToastNotification from '../../components/ToastNotification/ToastNotification';
import { useState } from 'react';

interface MentorCardProps {
  mentor: Mentor;
  topics: Topic[];
  canBookAMentorship: boolean;
  openModal: () => void;
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  topics,
  canBookAMentorship,
  openModal,
}) => {
  const isActive = mentor.status === 'ACTIVE';
  const isUnavailable = mentor.status === 'NOT_AVAILABLE';

  const [showToast, setShowToast] = useState(false);

  const findTopicsName = (id: string) => {
    const topic = topics.find((e) => e._id == id);
    return topic.title;
  };

  const mentorNameForId = getNameForId(mentor.name);

  const onCopyUrl = async () => {
    const mentorUrl = `${location?.href}#${mentorNameForId}`;
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(mentorUrl);
    } else {
      document.execCommand('copy', true, mentorUrl);
    }
    setShowToast(true);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: isActive ? 1 : 0.66 }}
      exit={{ y: -100, opacity: 0 }}
      className="flex flex-col w-full p-6 rounded-lg bg-zinc-800 space-between scroll-m-16 snap-y"
      id={mentorNameForId}
    >
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
              {isUnavailable ? (
                <button
                  type="button"
                  className="capitalize cursor-not-allowed text-md btn btn-secondary"
                >
                  No disponible
                </button>
              ) : isActive && mentor.calendly && canBookAMentorship ? (
                <Link href={mentor.calendly}>
                  <a
                    target="_blank"
                    className="capitalize border text-md text-primary border-zinc-50 btn hover:text-zinc-800 hover:bg-zinc-50 hover:border-zinc-50"
                  >
                    <span>Solicitar mentoría</span>
                  </a>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openModal()}
                  className=" border text-md text-primary border-zinc-50 btn hover:text-zinc-800 hover:bg-zinc-50 hover:border-zinc-50"
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
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                  >
                    <FontAwesomeIcon className="w-4 h-4 " icon={faGlobe} />
                  </a>
                </Link>
              )}
              {mentor.linkedin && (
                <Link href={mentor.linkedin}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                  >
                    <FontAwesomeIcon className="w-4 h-4" icon={faLinkedinIn} />
                  </a>
                </Link>
              )}
              {mentor.github && (
                <Link href={mentor.github}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                  >
                    <FontAwesomeIcon className="w-4 h-4" icon={faGithub} />
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2
          className="mb-2 text-xl font-bold text-primary cursor-pointer"
          onClick={onCopyUrl}
        >
          {mentor.name}
        </h2>
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
      <ToastNotification
        type="success"
        showToast={showToast}
        onDidDismiss={() => setShowToast(false)}
      >
        <span>Se copió la url</span>
      </ToastNotification>
    </motion.div>
  );
};

export default MentorCard;
