import { use } from 'react';
import SectionHero from '@/components/SectionHero';
import { getPageByName, getAllCMYKProjects } from '@/lib/api.server';
import type { AppPage } from '@/lib/types';
import { getPageMetadata } from '@/lib/seo';
import CMYKEditions from '@/components/CMYKEditions';

export const revalidate = 60;

export const runtime = 'edge';

export const generateMetadata = () => getPageMetadata('CMYK');

const CMYKPage: AppPage = () => {
  const page = use(getPageByName('CMYK'));
  const projects = use(getAllCMYKProjects());

  return (
    <>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />
      <CMYKEditions projects={projects} />
    </>
  );
};

export default CMYKPage;
