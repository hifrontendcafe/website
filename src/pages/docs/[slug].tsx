import { useRouter } from 'next/router';
import Error from 'next/error';

import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';

import Layout from '@/components/Layout';

import { getAllDocs, getDocBySlug, getSettings } from '@/lib/api';
import { usePreviewSubscription } from '@/lib/sanity';
import { docQuery } from '@/lib/queries';
import RichText from '@/components/RichText';
import { PortableTextReactComponents } from '@portabletext/react';
import { OrderedList, UnorderedList } from '@/components/MDX';

type DocPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const components: Partial<PortableTextReactComponents> = {
  list: {
    // eslint-disable-next-line react/display-name
    number: ({ children }) => (
      <OrderedList className="pl-9">{children}</OrderedList>
    ),
    // eslint-disable-next-line react/display-name
    bullet: ({ children }) => (
      <UnorderedList className="pl-9">{children}</UnorderedList>
    ),
  },
};

const DocPage: React.FC<DocPageProps> = ({ data, preview }) => {
  const router = useRouter();
  const { data: doc } = usePreviewSubscription(docQuery, {
    params: { slug: data?.slug },
    initialData: data,
    enabled: preview,
  });

  if (!router.isFallback && !data?.slug) return <Error statusCode={404} />;

  if (router.isFallback) return <div>Cargando...</div>;

  console.log(doc.body);

  return (
    <Layout title={doc.title} preview={preview}>
      <div style={{ margin: 'auto', maxWidth: '675px', marginBottom: '100px' }}>
        <RichText components={components} value={data.body} />
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
  const settings = await getSettings(preview);
  const data = await getDocBySlug(params.slug as string, preview);

  return {
    props: { data, preview, settings },
    revalidate: 1,
  };
};

export default DocPage;
