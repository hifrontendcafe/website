import type { AppPage } from '@/lib/types';
import { getAllCMYKProjects } from '@/lib/api.server';
import CMYKEditions from '@/components/CMYKEditions';

export const revalidate = 60;

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

export const fetchCache = 'force-cache';

const CMYKPage: AppPage = async ({ searchParams }) => {
  const projects = await getAllCMYKProjects();

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <CMYKEditions projects={projects} edition={+searchParams.edition} />
    </>
  );
};

export default CMYKPage;
