import CMYKEditions from '@/components/CMYKEditions';
import CMYKEditionsSkeleton from '@/components/CMYKEditions/CMYKEditionsSkeleton';
import { getAllCMYKProjects } from '@/lib/api.server';
import { getPageMetadata } from '@/lib/seo';
import type { AppPage } from '@/lib/types';
import { Suspense } from 'react';

export const generateMetadata = () => getPageMetadata('CMYK');

const CMYKPage: AppPage = async () => {
  const projects = await getAllCMYKProjects({
    next: { revalidate: 60 },
  });

  return (
    <Suspense fallback={<CMYKEditionsSkeleton />}>
      <CMYKEditions projects={projects} />
    </Suspense>
  );
};

export default CMYKPage;
