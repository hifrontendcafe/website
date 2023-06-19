import MentorList from '@/components/MentorList';
import { PageComponents } from '@/components/Page/Matcher';
import {
  getAllMentors,
  getMentoringTopics,
  getPageByName,
} from '@/lib/api.server';
import { getPageMetadata } from '@/lib/seo';

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

      <MentorList topics={topics} mentors={mentors} />
    </>
  );
}
