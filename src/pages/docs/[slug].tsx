import { GetStaticPaths, GetStaticProps } from 'next';
import BlockContent from '@sanity/block-content-to-react';
import { useRouter } from 'next/router';
import Error from 'next/error';

import Layout from '../../components/Layout';

import { getAllDocs, getDocBySlug } from '../../lib/api';
import { Doc } from '../../lib/types';
import { usePreviewSubscription } from '../../lib/sanity';
import { docQuery } from '../../lib/queries';
import { getLayout } from '@/utils/get-layout';

import styles from './styles.module.css';

type DocProps = {
  data: Doc;
  preview?: boolean;
};

const DocPage: React.FC<DocProps> = ({ data, preview }) => {
  const router = useRouter();

  if (!router.isFallback && !data?.slug) return <Error statusCode={404} />;

  const { data: doc } = usePreviewSubscription(docQuery, {
    params: { slug: data?.slug },
    initialData: data,
    enabled: preview,
  });

  if (router.isFallback) return <div>Cargando...</div>;

  return (
    <Layout title={doc.title} preview={preview}>
      <div className="bg-indigo-100 sm:pt-10 pb-24">
        <div className=" container mx-auto min-h-screen bg-white overflow-hidden shadow rounded-lg">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:tr uncate">
                  {doc.title}
                </h2>
              </div>
            </div>
          </div>
          <div className={`px-12 py-5 text-gray-700 ${styles.body}`}>
            <BlockContent blocks={doc.body} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getAllDocs();

  const paths = docs?.map((doc) => ({
    params: { slug: doc.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const { dehydratedState } = await getLayout({ preview });
  const data = await getDocBySlug(params.slug as string, preview);
  return {
    props: { data, preview, dehydratedState },
    revalidate: 1,
  };
};

export default DocPage;
