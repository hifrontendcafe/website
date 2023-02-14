import { use } from 'react';
import SectionHero from '@/components/SectionHero';

import { PageComponents } from '@/components/Page/Matcher';
import MentorList from '@/components/MentorList';
import { getPageMetadata } from '@/lib/seo';
import { AppPage } from '@/lib/types';
import { getMentoringTopics, getPageByName } from '@/lib/api.server';

export const revalidate = 60;

export const generateMetadata = () => getPageMetadata('Mentorías');

export const generateStaticParams = async () => {
  const topics = await getMentoringTopics();

  return topics.map((topic) => ({
    speciality: topic._id,
  }));
};

export const dynamicParams = true;

const MentorshipsSpecialityPage: AppPage<{ speciality: string }> = ({
  params,
}) => {
  const page = use(getPageByName('Mentorías'));

  return (
    <>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />

      <PageComponents components={page.components} />

      <MentorList speciality={params.speciality} />
    </>
  );
};

export default MentorshipsSpecialityPage;
