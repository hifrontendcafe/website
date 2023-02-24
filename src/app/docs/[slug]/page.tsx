import { notFound } from 'next/navigation';

import DocsRichText from '@/components/DocsRichText';
import { AppPage } from '@/lib/types';
import { getAllDocs, getDocBySlug } from '@/lib/api.server';
import { getMetadata } from '@/lib/seo';

export const revalidate = 60;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const doc = await getDocBySlug(params.slug);

  return getMetadata({ title: doc.title });
};

export const generateStaticParams = async () => {
  const docs = await getAllDocs();

  return docs.map((doc) => ({
    slug: doc.slug,
  }));
};

const DocPage: AppPage<{ slug: string }> = async ({ params }) => {
  const doc = await getDocBySlug(params.slug);

  if (!doc.slug) return notFound();

  return (
    <div style={{ margin: 'auto', maxWidth: '675px', marginBottom: '100px' }}>
      <DocsRichText body={doc.body} />
    </div>
  );
};

export default DocPage;
