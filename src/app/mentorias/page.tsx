import SectionHero from '@/components/SectionHero';
import {
  getAllMentors,
  getMentoringTopics,
  getPageByName,
} from '@/lib/api.server';
import { PageComponents } from '@/components/Page/Matcher';
import MentorList from '@/components/MentorList';
import { getPageMetadata } from '@/lib/seo';

export const revalidate = 60;

export const generateMetadata = () => getPageMetadata('Mentorías');

export default async function MentorshipsPage() {
  const [page, topics, mentors] = await Promise.all([
    getPageByName('Mentorías'),
    getMentoringTopics(),
    getAllMentors(),
  ]);

  return (
    <>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />

      <PageComponents components={page.components} />

      <MentorList topics={topics} mentors={mentors} />
    </>
  );
}
