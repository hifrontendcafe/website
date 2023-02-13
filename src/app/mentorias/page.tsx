import { use, useMemo } from 'react';
import SectionHero from '@/components/SectionHero';
import {
  getAllMentors,
  getMentoringTopics,
  getPageByName,
} from '@/lib/api.server';
import { PageComponents } from '@/components/Page/Matcher';
import MentorList from '@/components/MentorList';
import { getPageMetadata } from '@/lib/seo';
import MentorCard from '@/components/MentorCard';
import { AppPage } from '@/lib/types';

export const revalidate = 60;

export const dynamic = 'force-dynamic';

export const generateMetadata = () => getPageMetadata('Mentorías');

const MentorshipsPage: AppPage = ({ searchParams }) => {
  const page = use(getPageByName('Mentorías'));
  const topics = use(getMentoringTopics());
  const mentors = use(getAllMentors());

  const speciality = searchParams.especialidad;

  /**
   * All active mentors should be first
   */
  const sortedMentors = useMemo(
    () => [...mentors].sort((mentor) => (mentor.status === 'ACTIVE' ? -1 : 1)),
    [mentors],
  );

  const filteredMentors = useMemo(() => {
    if (!speciality) return sortedMentors;

    return sortedMentors.filter((mentor) =>
      mentor.topics?.some((topic) => topic._ref === speciality),
    );
  }, [sortedMentors, speciality]);

  return (
    <>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />

      <PageComponents components={page.components} />

      <MentorList topics={topics}>
        {filteredMentors.map((mentor, index) => (
          <MentorCard key={index} mentor={mentor} topics={topics} />
        ))}
      </MentorList>
    </>
  );
};

export default MentorshipsPage;
