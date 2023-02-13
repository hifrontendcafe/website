'use client';

import { lazy, useState, useMemo } from 'react';
import type { Mentor } from '@/lib/types';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { requestWarningsStates, useWarnings } from '../MentorList/useWarnings';

type BookButtonProps = {
  mentor: Mentor;
};

const MentorModal = lazy(() => import('../MentorModal'));

const BookButton: React.FC<BookButtonProps> = ({ mentor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, loading] = useSession();
  const { status, warnings, mentorships } = useWarnings(session?.user?.id);

  const isActive = mentor.status === 'ACTIVE';
  const isUnavailable = mentor.status === 'NOT_AVAILABLE';

  const canBookAMentorship = useMemo(
    () =>
      session &&
      !loading &&
      status === requestWarningsStates.SUCCESS &&
      warnings === 0 &&
      mentorships <= 4,
    [session, loading, status, warnings, mentorships],
  );

  return (
    <>
      {isUnavailable ? (
        <button
          type="button"
          className="capitalize cursor-not-allowed text-md btn btn-secondary"
        >
          No disponible
        </button>
      ) : isActive && mentor.calendly && canBookAMentorship ? (
        <Link
          href={mentor.calendly}
          target="_blank"
          className="capitalize border text-md text-primary border-zinc-50 btn hover:text-zinc-800 hover:bg-zinc-50 hover:border-zinc-50"
        >
          <span>Solicitar mentoría</span>
        </Link>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className=" border text-md text-primary border-zinc-50 btn hover:text-zinc-800 hover:bg-zinc-50 hover:border-zinc-50"
          >
            Solicitar mentoría
          </button>

          <MentorModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
      )}
    </>
  );
};

export default BookButton;
