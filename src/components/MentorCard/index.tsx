import { FrontendCafeId } from '@/lib/constants';
import { Mentor } from '@/lib/sanity/mentor/getMentor';
import { Topic } from '@/lib/sanity/topics/getMentoringTopics';
import type { DiscordEvent } from '@/lib/types';
import { faChain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ToastNotification from '../../components/ToastNotification/ToastNotification';
import { getNameForId } from '../../lib/mentors';
import DateAndTime from '../DateAndTime';
import { requestWarningsStates, useWarnings } from '../MentorList/useWarnings';
import SocialMediaLinks from '../SocialMediaLinks';
import TopicBadge from '../TopicBadge';

interface MentorCardProps {
  mentor: Mentor;
  topics: Topic[];
  openModal: () => void;
  event: DiscordEvent | undefined;
}

export default function MentorCard({
  mentor,
  topics,
  openModal,
  event,
}: MentorCardProps) {
  const isActive = mentor.status === 'ACTIVE';

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
      className="flex max-w-3xl snap-y scroll-m-16 flex-col gap-4 rounded-lg bg-zinc-800 p-3 md:p-6"
      id={mentorNameForId}
    >
      <div className="flex justify-between gap-8">
        <Image
          className="h-24 w-24 rounded-full bg-zinc-300 object-cover"
          src={`${mentor.photo.src}?h=96`}
          alt={`Foto de ${mentor.name}`}
          height={96}
          width={96}
          placeholder="blur"
          blurDataURL={`${mentor.photo.src}?h=50`}
        />

        <div className="flex flex-col items-center sm:max-w-min">
          {event && (
            <div className="text-sm text-greenFec">
              <p className="line-clamp-1">{event.name}</p>
              <DateAndTime
                className="sm:whitespace-nowrap"
                dateString={event.scheduled_start_time}
              />
            </div>
          )}
          <BookMentorshipButton
            event={event}
            isActive={isActive}
            mentor={mentor}
            openModal={openModal}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <h3
          className="group cursor-pointer text-lg font-bold md:text-xl"
          onClick={onCopyUrl}
        >
          {mentor.name}{' '}
          <FontAwesomeIcon
            aria-hidden
            className="h-5 w-5 opacity-10 transition-opacity group-hover:opacity-40"
            icon={faChain}
          />
        </h3>
        <SocialMediaLinks className="place-content-end" socialMedia={mentor} />
      </div>
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
}

function BookMentorshipButton({
  event,
  isActive,
  mentor,
  openModal,
}: Omit<MentorCardProps, 'topics'> & {
  isActive: boolean;
}) {
  const { data: session, status: sessionStatus } = useSession();
  const { status, warnings, mentorships } = useWarnings(session?.user.id);
  const loading = sessionStatus === 'loading';

  const canBookAMentorship =
    !!session &&
    !loading &&
    status === requestWarningsStates.SUCCESS &&
    warnings === 0 &&
    mentorships <= 4;

  if (mentor.status === 'NOT_AVAILABLE') {
    return (
      <button
        type="button"
        disabled
        className="btn btn-secondary mt-auto cursor-not-allowed self-end whitespace-nowrap"
      >
        No disponible
      </button>
    );
  }

  if (isActive && (event || (mentor.calendly && canBookAMentorship))) {
    const url = event
      ? `https://discord.com/events/${FrontendCafeId}/${event.id}`
      : mentor.calendly;

    return (
      <Link
        href={url}
        target="_blank"
        className="btn mt-auto self-end whitespace-nowrap border border-zinc-50 hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-800"
      >
        {event ? 'Asistir a mentoría' : 'Solicitar mentoría'}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={openModal}
      className="btn mt-auto self-end whitespace-nowrap border border-zinc-50 hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-800"
    >
      Solicitar mentoría
    </button>
  );
}
