import { useRouter } from 'next/router';
import Error from 'next/error';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import Layout from '@/components/Layout';

import { getAllDocs, getDocBySlug, getSettings } from '@/lib/api';
import { usePreviewSubscription } from '@/lib/sanity';
import { docQuery } from '@/lib/queries';

import {
  Heading1,
  Heading2,
  Heading3,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Strong,
  UnorderedList,
} from '@/components/MDX';

import type { Doc } from '@/lib/types';

interface DocProps {
  data: Doc;
  mdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  preview?: boolean;
}

const DocPage: React.FC<DocProps> = ({ mdx, data, preview }) => {
  const router = useRouter();
  const { data: doc } = usePreviewSubscription(docQuery, {
    params: { slug: data?.slug },
    initialData: data,
    enabled: preview,
  });

  if (!router.isFallback && !data?.slug) return <Error statusCode={404} />;

  if (router.isFallback) return <div>Cargando...</div>;

  return (
    <Layout title={doc.title} preview={preview}>
      <div style={{ margin: 'auto', maxWidth: '675px', marginBottom: '100px' }}>
        <MDXRemote
          {...mdx}
          components={{
            h1: Heading1,
            h2: Heading2,
            h3: Heading3,
            p: Paragraph,
            strong: Strong,
            a: Link,
            ul: UnorderedList,
            ol: OrderedList,
            li: ListItem,
          }}
        />
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

  const source = data.content;
  const mdx = await serialize(source);

  return {
    props: { mdx, data, preview, settings },
    revalidate: 1,
  };
};

export default DocPage;
