import { GetStaticProps } from 'next';
import Link from 'next/link';

import Layout from '../../components/Layout';

import { getAllDocs, getSettings } from '@/lib/api';
import { Doc } from '../../lib/types';
import { usePreviewSubscription } from '../../lib/sanity';
import { docsQuery } from '../../lib/queries';

type DocsPageProps = {
  data: Doc[];
  preview?: boolean;
};

const DocsPage: React.FC<DocsPageProps> = ({ data, preview }) => {
  const { data: docs } = usePreviewSubscription(docsQuery, {
    initialData: data,
    enabled: preview,
  });

  return (
    <Layout
      title="Docs"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
      preview={preview}
    >
      <div className="pb-40 sm:pt-10">
        <div className="mt-10 overflow-hidden border-2 border-zinc-500 rounded-lg shadow bg-zinc-800">
          <div className="px-4 py-5 border-b border-zinc-500 sm:px-6">
            <div></div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:tr uncate">
                  Documentos Útiles
                </h2>
              </div>
            </div>
          </div>
          <div className="py-5 px-7 text-tertiary">
            <ul className="text-lg">
              {docs?.map(({ title, slug }) => (
                <li className="hover:text-informational" key={slug}>
                  <Link href="/docs/[slug]" as={`/docs/${slug}`}>
                    <a>{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllDocs(preview);
  const settings = await getSettings(preview);

  return {
    props: { data, preview, settings },
    revalidate: 1,
  };
};

export default DocsPage;
