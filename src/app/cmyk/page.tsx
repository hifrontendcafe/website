import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/api.server';
import type { AppPage } from '@/lib/types';
import { getPageMetadata } from '@/lib/seo';
import CMYKEditions from '@/components/CMYKEditions';
import { Suspense } from 'react';
import CMYKEditionsSkeleton from '@/components/CMYKEditions/Skeleton';

export const revalidate = 60;

export const generateMetadata = () => getPageMetadata('CMYK');

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

export const fetchCache = 'force-cache';

const CMYKPage: AppPage = async ({ searchParams }) => {
  const page = await getPageByName('CMYK');

  return (
    <>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />

      <Suspense fallback={<CMYKEditionsSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <CMYKEditions edition={searchParams.edition} />
      </Suspense>
    </>
  );
};

export default CMYKPage;
