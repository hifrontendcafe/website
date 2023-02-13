import { use } from 'react';
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

export default function MentorshipsPage() {
  const page = use(getPageByName('Mentorías'));
  const topics = use(getMentoringTopics());
  const mentors = use(getAllMentors());

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
