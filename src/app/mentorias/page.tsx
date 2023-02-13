import { use } from 'react';
import SectionHero from '@/components/SectionHero';

import { PageComponents } from '@/components/Page/Matcher';
import MentorList from '@/components/MentorList';
import { getPageMetadata } from '@/lib/seo';
import { AppPage } from '@/lib/types';
import { getPageByName } from '@/lib/api.server';

export const revalidate = 60;

export const dynamic = 'force-dynamic';

export const generateMetadata = () => getPageMetadata('Mentorías');

const MentorshipsPage: AppPage = ({ searchParams }) => {
  const page = use(getPageByName('Mentorías'));

  return (
    <>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />

      <PageComponents components={page.components} />

      <MentorList speciality={searchParams.especialidad as string} />
    </>
  );
};

export default MentorshipsPage;
