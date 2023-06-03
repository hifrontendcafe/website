import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faChain, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ToastNotification from '../../components/ToastNotification/ToastNotification';
import { getNameForId } from '../../lib/mentors';
import { Mentor, Topic } from '../../lib/types';
import TopicBadge from '../TopicBadge';

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
    const topic = topics.find((e) => e._id == id)!;

    return topic?.title;
  };

  const mentorNameForId = getNameForId(mentor.name);

  const onCopyUrl = async () => {
    const baseUrl = location?.href?.split('#')?.[0];
    const mentorUrl = `${baseUrl}#${mentorNameForId}`;
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(mentorUrl);
    } else {
      document.execCommand('copy', true, mentorUrl);
    }
    setShowToast(true);
  };

  return (
    <motion.li
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: isActive ? 1 : 0.66 }}
      exit={{ y: -100, opacity: 0 }}
      className="flex max-w-3xl snap-y scroll-m-16 flex-col gap-4 rounded-lg bg-zinc-800 p-6"
      id={mentorNameForId}
    >
      <div className="flex justify-between gap-4">
        <Image
          className="h-24 w-24 rounded-full bg-zinc-300 object-cover"
          src={`${mentor.photo.src}?h=96`}
          alt={`Foto de ${mentor.name}`}
          height={96}
          width={96}
          placeholder="blur"
          blurDataURL={`${mentor.photo.src}?h=50`}
        />

        <div className="flex flex-col justify-between gap-4">
          {isUnavailable ? (
            <button
              type="button"
              disabled
              className="text-md btn btn-secondary cursor-not-allowed capitalize"
            >
              No disponible
            </button>
          ) : isActive && mentor.calendly && canBookAMentorship ? (
            <Link
              href={mentor.calendly}
              target="_blank"
              className="text-md btn border border-zinc-50 capitalize hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-800"
            >
              Solicitar mentoría
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => openModal()}
              className="text-md btn border border-zinc-50 capitalize hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-800"
            >
              Solicitar mentoría
            </button>
          )}

          <ul className="flex place-content-end gap-2">
            {/* TODO: Maybe create an icon component */}
            {mentor.web && (
              <li>
                <Link
                  href={mentor.web}
                  target="_blank"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700"
                >
                  <FontAwesomeIcon className="h-4 w-4" icon={faGlobe} />
                </Link>
              </li>
            )}

            {mentor.linkedin && (
              <li>
                <Link
                  href={mentor.linkedin}
                  target="_blank"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700"
                >
                  <FontAwesomeIcon className="h-4 w-4" icon={faLinkedinIn} />
                </Link>
              </li>
            )}
            {mentor.github && (
              <li>
                <Link
                  href={mentor.github}
                  target="_blank"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700"
                >
                  <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
                </Link>
              </li>
            )}

            {mentor.twitter && (
              <li>
                <Link
                  href={mentor.twitter}
                  target="_blank"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700"
                >
                  <FontAwesomeIcon className="h-4 w-4" icon={faTwitter} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <h3
        className="group cursor-pointer text-xl font-bold"
        onClick={onCopyUrl}
      >
        {mentor.name}{' '}
        <FontAwesomeIcon
          aria-hidden
          className="h-5 w-5 opacity-10 transition-opacity group-hover:opacity-40"
          icon={faChain}
        />
      </h3>
      <p className="flex-grow leading-relaxed text-tertiary md:min-h-64">
        {mentor.description ? mentor.description : '---'}
      </p>
      <ul className="flex flex-wrap gap-2">
        {mentor.topics &&
          mentor.topics?.map((topic) => (
            <TopicBadge key={topic._key} topic={findTopicsName(topic._ref)} />
          ))}
      </ul>

      <ToastNotification
        type="success"
        showToast={showToast}
        onDidDismiss={() => setShowToast(false)}
      >
        <span>Copiado</span>
      </ToastNotification>
    </motion.li>
  );
};

export default MentorCard;
