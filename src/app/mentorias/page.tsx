import MentorList from '@/components/MentorList';
import { PageComponents } from '@/components/Page/Matcher';
import SectionHero from '@/components/SectionHero';
import {
  getAllMentors,
  getMentoringTopics,
  getPageByName,
} from '@/lib/api.server';
import { getAllDiscordEvents } from '@/lib/discord';
import { getPageMetadata } from '@/lib/seo';

export const generateMetadata = () => getPageMetadata('Mentorías');

export default async function MentorshipsPage() {
  const [page, topics, mentors] = await Promise.all([
    getPageByName({ name: 'Mentorías' }),
    getMentoringTopics({ next: { revalidate: 180 } }),
    getAllMentors({ next: { revalidate: 60 } }),
  ]);

  const response = await getAllDiscordEvents();
  const events = await response.json();

  return (
    <>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />

      <PageComponents components={page.components} />

      <MentorList topics={topics} mentors={mentors} events={events} />
    </>
  );
}
