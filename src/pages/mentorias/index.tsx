import { GetStaticProps } from 'next';

import MentorList from '../../components/MentorList';
import Layout from '../../components/Layout';

import { Mentor, Topic, Page } from '@/lib/types';
import {
  getAllMentors,
  getMentoringTopics,
  getSettings,
  getPageByHero,
} from '../../lib/api';
import { mentorsQuery, mentorsTopicsQuery } from '../../lib/queries';
import { usePreviewSubscription } from '../../lib/sanity';
import SectionHero from '@/components/SectionHero';
import { PageComponents } from '@/components/Page/Matcher';

type MentorshipsPageProps = {
  mentors: Mentor[];
  topics: Topic[];
  preview?: boolean;
  page: Page;
};

const MentorshipsPage: React.FC<MentorshipsPageProps> = ({
  topics: topicsData,
  mentors: mentorsData,
  page: pageData,
  preview,
}) => {
  const { data: mentors } = usePreviewSubscription(mentorsQuery, {
    initialData: mentorsData,
    enabled: preview,
  });

  const { data: topics } = usePreviewSubscription(mentorsTopicsQuery, {
    initialData: topicsData,
    enabled: preview,
  });

  return (
    <Layout
      title={pageData.title}
      description={pageData.shortDescription}
      metadata={pageData.metadata}
      preview={preview}
    >
      <SectionHero
        title={pageData.title}
        paragraph={pageData.description}
        cta={pageData.doc}
      />
      <PageComponents components={pageData.components} />
      <MentorList topics={topics} mentors={mentors} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const mentors = await getAllMentors(preview);
  const topics = await getMentoringTopics(preview);
  const settings = await getSettings(preview);
  const page = await getPageByHero(preview, 'Mentorías');

  return {
    props: { mentors, topics, preview, settings, page },
    revalidate: 1,
  };
};

export default MentorshipsPage;
