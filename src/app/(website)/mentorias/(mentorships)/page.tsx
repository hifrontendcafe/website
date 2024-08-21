import MentorList from '@/components/MentorList';
import MentorListSkeleton from '@/components/MentorList/MentorListSkeleton';
import { getAllDiscordEvents } from '@/lib/discord';
import { getAllMentors } from '@/lib/sanity/mentor/getAllMentors';
import { getMentoringTopics } from '@/lib/sanity/topics/getMentoringTopics';
import { getPageMetadata } from '@/lib/seo';
import { shuffle } from '@/lib/shuffle';
import { Suspense } from 'react';

export const generateMetadata = () => getPageMetadata('Mentorías');

export default async function MentorshipsPage() {
  const [topics, mentors] = await Promise.all([
    getMentoringTopics({ next: { revalidate: 180 } }),
    getAllMentors({ next: { revalidate: 60 } }),
  ]);

  const events = await getAllDiscordEvents();

  const availableMentors = mentors.filter(
    (mentor) => mentor.status === 'ACTIVE',
  );

  const notAvailableMentors = mentors.filter(
    (mentor) => mentor.status !== 'ACTIVE',
  );

  // randomize mentors order
  shuffle(availableMentors);
  shuffle(notAvailableMentors);

  return (
    <>
      <Suspense fallback={<MentorListSkeleton />}>
        <MentorList
          topics={topics}
          mentors={[...availableMentors, ...notAvailableMentors]}
          events={events}
        />
      </Suspense>
    </>
  );
}
