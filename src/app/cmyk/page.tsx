import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/api.server';
import type { AppPage } from '@/lib/types';
import { getPageMetadata } from '@/lib/seo';
import CMYKEditions from '@/components/CMYKEditions';
import { getAllCMYKProjects } from '@/lib/api';

export const revalidate = 60;

export const generateMetadata = () => getPageMetadata('CMYK');

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

const CMYKPage: AppPage = async ({ searchParams }) => {
  const [page, projects] = await Promise.all([
    getPageByName('CMYK'),
    getAllCMYKProjects(),
  ]);

  return (
    <>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />
      {/* @ts-expect-error Server Component */}
      <CMYKEditions projects={projects} edition={+searchParams.edition} />
    </>
  );
};

export default CMYKPage;
