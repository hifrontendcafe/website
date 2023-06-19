import MentorList from '@/components/MentorList';
import MentorListSkeleton from '@/components/MentorList/MentorListSkeleton';
import { PageComponents } from '@/components/Page/Matcher';
import {
  getAllMentors,
  getMentoringTopics,
  getPageByName,
} from '@/lib/api.server';
import { getPageMetadata } from '@/lib/seo';
import { Suspense } from 'react';

export const generateMetadata = () => getPageMetadata('Mentorías');

export default async function MentorshipsPage() {
  const [page, topics, mentors] = await Promise.all([
    getPageByName({ name: 'Mentorías' }),
    getMentoringTopics({ next: { revalidate: 180 } }),
    getAllMentors({ next: { revalidate: 60 } }),
  ]);

  return (
    <>
      <PageComponents components={page.components} />

      <Suspense fallback={<MentorListSkeleton />}>
        <MentorList topics={topics} mentors={mentors} />
      </Suspense>
    </>
  );
}
