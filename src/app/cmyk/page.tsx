import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/api.server';
import type { AppPage } from '@/lib/types';
import { getPageMetadata } from '@/lib/seo';
import CMYKEditions from '@/components/CMYKEditions';
import { Suspense } from 'react';
import CMYKEditionsSkeleton from '@/components/CMYKEditions/Skeleton';

export const generateMetadata = () => getPageMetadata('CMYK');

export const dynamic = 'auto';

export const fetchCache = 'force-cache';

export const runtime = 'edge';

const CMYKPage: AppPage = async ({ searchParams }) => {
  const page = await getPageByName({
    name: 'CMYK',
    next: {
      revalidate: 60,
    },
  });

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
