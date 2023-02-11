import { use } from 'react';
import { notFound } from 'next/navigation';

import type { AppPage } from '@/lib/types';
import { getPageByPath } from '@/lib/api.server';
import { PageComponents } from '@/components/Page/Matcher';

export const generateStaticParams = () => {
  return [];
};

export const dynamicParams = true;

const CustomPage: AppPage<{ slug: string[] }> = ({ params }) => {
  const [base, ...rest] = params.slug;

  const path = [`/${base}`].concat(rest).join('/');

  const page = use(getPageByPath(path));

  if (process.env.NODE_ENV === 'production') return notFound();

  if (typeof page.title === 'undefined') return notFound();

  return (
    <div className="mt-4">
      <PageComponents components={page?.components} />
    </div>
  );
};

export default CustomPage;
