import SectionHero from '@/components/SectionHero';
import Steps from '@/components/Steps';
import { getSettings } from '@/lib/api';
import { getAllMentorTimeSlots, getMentorList } from '@/lib/calomentorApi';
import { Page } from '@/lib/types';
import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import MentorList from '../../components/MentorList';
import { getPageByHero } from '../../lib/api';
import { MentorCalomentor, TimeSlot } from '../../lib/types';

type MentorshipsPageProps = {
  mentors: MentorCalomentor[];
  slots: TimeSlot[][];
  preview?: boolean;
  page: Page;
};

const MentorshipsPage: React.FC<MentorshipsPageProps> = ({
  mentors,
  slots,
  page: pageData,
  preview,
}) => {
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
      <Steps steps={pageData.steps} />
      <MentorList mentors={mentors} slots={slots} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const mentors = await getMentorList(preview);
  const slots = await getAllMentorTimeSlots(mentors);
  const settings = await getSettings(preview);
  const page = await getPageByHero(preview, 'Mentorías');

  return {
    props: { mentors, slots, preview, settings, page },
    revalidate: 1,
  };
};

export default MentorshipsPage;
