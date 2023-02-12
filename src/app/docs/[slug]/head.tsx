import { use } from 'react';
import type { AppPage } from '@/lib/types';
import SEO from '@/components/SEO';
import { getDocBySlug } from '@/lib/api.server';

const DocHead: AppPage<{ slug: string }> = ({ params }) => {
  const doc = use(getDocBySlug(params.slug));

  return <SEO title={doc.title} />;
};

export default DocHead;
