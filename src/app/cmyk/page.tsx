import CMYKEditions from '@/components/CMYKEditions';
import CMYKEditionsSkeleton from '@/components/CMYKEditions/Skeleton';
import { getPageMetadata } from '@/lib/seo';
import type { AppPage } from '@/lib/types';
import { Suspense } from 'react';

export const generateMetadata = () => getPageMetadata('CMYK');

export const dynamic = 'auto';

const CMYKPage: AppPage = async ({ searchParams }) => {
  return (
    <Suspense fallback={<CMYKEditionsSkeleton />}>
      {/* @ts-expect-error Server Component */}
      <CMYKEditions edition={searchParams.edition} />
    </Suspense>
  );
};

export default CMYKPage;
