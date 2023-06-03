import { notFound } from 'next/navigation';

import type { AppPage } from '@/lib/types';
import { getPageByPath } from '@/lib/api.server';
import { PageComponents } from '@/components/Page/Matcher';

export const generateStaticParams = () => {
  return [];
};

// FIXME: https://github.com/vercel/next.js/issues/49489
const dynamicParams = true;
export { dynamicParams };

const CustomPage: AppPage<{ slug: string[] }> = async ({ params }) => {
  const [base, ...rest] = params.slug;

  const path = [`/${base}`].concat(rest).join('/');

  const page = await getPageByPath({ path, next: { revalidate: 120 } });

  if (!page) return notFound();

  return (
    <div className="mt-4">
      <PageComponents components={page?.components} />
    </div>
  );
};

export default CustomPage;
