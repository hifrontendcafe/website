import CMYKEdition from '@/components/CMYKEditions';
import CMYKEditionsSkeleton from '@/components/CMYKEditions/CMYKEditionsSkeleton';
import { cmykVersions } from '@/components/CMYKEditions/cmykVersions';
import { getPageMetadata } from '@/lib/seo';
import type { AppPage } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const generateMetadata = () => {
  return getPageMetadata('CMYK');
};

export async function generateStaticParams() {
  return cmykVersions.map(({ edition }) => ({
    params: { edition },
  }));
}

const cmykEditions = new Set(cmykVersions.map((cmyk) => cmyk.edition));

function isValidEdition(
  edition: string,
): edition is (typeof cmykVersions)[number]['edition'] {
  return cmykEditions.has(edition as (typeof cmykVersions)[number]['edition']);
}

const CMYKPage: AppPage<{ edition: string }> = async ({ params }) => {
  const edition = params.edition;

  if (!isValidEdition(edition)) {
    notFound();
  }

  return (
    <Suspense fallback={<CMYKEditionsSkeleton />}>
      <CMYKEdition edition={edition} />
    </Suspense>
  );
};

export default CMYKPage;
