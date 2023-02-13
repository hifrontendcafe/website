'use client';

import { getNameForId } from '@/lib/mentors';
import { Mentor } from '@/lib/types';
import { m } from 'framer-motion';
import Motion from '../Motion';

type AnimatedContainerProps = {
  children: React.ReactNode;
  mentor: Mentor;
};

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  mentor,
  children,
}) => {
  const mentorNameForId = getNameForId(mentor.name);

  const isActive = mentor.status === 'ACTIVE';

  return (
    <Motion>
      <m.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: isActive ? 1 : 0.66 }}
        exit={{ y: -100, opacity: 0 }}
        className="flex flex-col w-full p-6 rounded-lg bg-zinc-800 space-between scroll-m-16 snap-y"
        id={mentorNameForId}
      >
        {children}
      </m.div>
    </Motion>
  );
};

export default AnimatedContainer;
