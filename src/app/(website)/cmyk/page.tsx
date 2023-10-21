import CMYKEdition from '@/components/CMYKEditions';
import CMYKEditionsSkeleton from '@/components/CMYKEditions/CMYKEditionsSkeleton';
import { cmykVersions } from '@/components/CMYKEditions/cmykVersions';
import { getAllCMYKVersionsOrderedFromLatest } from '@/lib/api.server';
import { getPageMetadata } from '@/lib/seo';
import type { AppPage } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const generateMetadata = () => {
  return getPageMetadata('CMYK');
};

const CMYKPage: AppPage = async () => {
  const versions = await getAllCMYKVersionsOrderedFromLatest({
    next: { revalidate: 3600 },
  });

  const current = cmykVersions.find(
    (cmykVersion) => cmykVersion.version === versions[0],
  );

  if (!current) {
    console.warn(`No current CMYK version found for ${versions[0]}`);
    notFound();
  }

  return (
    <Suspense fallback={<CMYKEditionsSkeleton />}>
      <CMYKEdition edition={current.edition} />
    </Suspense>
  );
};

export default CMYKPage;
