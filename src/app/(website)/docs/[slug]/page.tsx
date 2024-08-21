import DocsRichText from '@/components/DocsRichText';
import { getAllDocs } from '@/lib/sanity/docs/getAllDocs';
import { getDocBySlug } from '@/lib/sanity/docs/getDocBySlug';
import { getMetadata } from '@/lib/seo';
import { AppPage } from '@/lib/types';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const doc = await getDocBySlug({ slug: params.slug });

  return getMetadata({ title: doc?.title });
};

export const generateStaticParams = async () => {
  const docs = await getAllDocs();

  return docs.map((doc) => ({
    slug: doc.slug,
  }));
};

const DocPage: AppPage<{ slug: string }> = async ({ params }) => {
  const doc = await getDocBySlug(
    { slug: params.slug },
    {
      next: { revalidate: 60 },
    },
  );

  if (!doc) return notFound();

  return (
    <section className="mx-auto max-w-prose">
      <DocsRichText body={doc.body} />
    </section>
  );
};

export default DocPage;
