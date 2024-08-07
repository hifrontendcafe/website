import { notFound } from 'next/navigation';

import { PageComponents } from '@/components/Page/Matcher';
import { getPageByPath } from '@/lib/sanity/getPageByPath';
import type { AppPage } from '@/lib/types';

export const generateStaticParams = () => {
  return [];
};

// FIXME: https://github.com/vercel/next.js/issues/49489
export const dynamicParams = true;

const CustomPage: AppPage<{ slug: string[] }> = async ({ params }) => {
  const [base, ...rest] = params.slug;

  const path = [`/${base}`].concat(rest).join('/');

  const page = await getPageByPath({ path }, { revalidate: 120 });

  if (!page) return notFound();

  return (
    <div className="mt-4">
      <PageComponents components={page?.components} />
    </div>
  );
};

export default CustomPage;
