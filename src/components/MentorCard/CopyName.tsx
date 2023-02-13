'use client';

import { getNameForId } from '@/lib/mentors';
import { Mentor } from '@/lib/types';
import { useState } from 'react';
import ToastNotification from '../ToastNotification/ToastNotification';

type CopyNameProps = {
  mentor: Mentor;
};

const CopyName: React.FC<CopyNameProps> = ({ mentor }) => {
  const [showToast, setShowToast] = useState(false);

  const onCopyUrl = async () => {
    const mentorNameForId = getNameForId(mentor.name);

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
    <>
      <h2
        className="mb-2 text-xl font-bold text-primary cursor-pointer"
        onClick={onCopyUrl}
      >
        {mentor.name}
      </h2>
      <ToastNotification
        type="success"
        showToast={showToast}
        onDidDismiss={() => setShowToast(false)}
      >
        <span>Copiado</span>
      </ToastNotification>
    </>
  );
};

export default CopyName;
