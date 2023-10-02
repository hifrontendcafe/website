import MentorList from '@/components/MentorList';
import MentorListSkeleton from '@/components/MentorList/MentorListSkeleton';
import { PageComponents } from '@/components/Page/Matcher';
import {
  getAllMentors,
  getMentoringTopics,
  getPageByName,
} from '@/lib/api.server';
import { getAllDiscordEvents } from '@/lib/discord';
import { getPageMetadata } from '@/lib/seo';
import { shuffle } from '@/lib/shuffle';
import { Suspense } from 'react';

export const generateMetadata = () => getPageMetadata('Mentorías');

export default async function MentorshipsPage() {
  const [page, topics, mentors] = await Promise.all([
    getPageByName({ name: 'Mentorías' }),
    getMentoringTopics({ next: { revalidate: 180 } }),
    getAllMentors({ next: { revalidate: 60 } }),
  ]);

  const response = await getAllDiscordEvents();
  const events = await response.json();

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
      <PageComponents components={page.components} />

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
