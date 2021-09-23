import { useRouter } from 'next/router';
import Error from 'next/error';

import Layout from '../../components/Layout';

import { getAllDocs, getDocBySlug, getSettings } from '@/lib/api';
import { usePreviewSubscription } from '../../lib/sanity';
import { docQuery } from '../../lib/queries';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import {
  Heading,
  Link,
  List,
  ListItem,
  Paragraph,
  Strong,
  SubHeading,
} from '../../components/MDX';

// type DocProps = {
//   data: Doc,
//   preview?: boolean,
// };

const DocPage = ({ mdx, data, preview }) => {
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
            h1: Heading,
            h2: SubHeading,
            p: Paragraph,
            strong: Strong,
            a: Link,
            ul: List,
            li: ListItem,
          }}
        />
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const docs = await getAllDocs();

  const paths = docs?.map((doc) => ({
    params: { slug: doc.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params, preview = false }) => {
  const settings = await getSettings(preview);
  const data = await getDocBySlug(params.slug, preview);

  const source = data.content;
  const mdxSource = await serialize(source);

  return {
    props: { mdx: mdxSource, data, preview, settings },
    revalidate: 1,
  };
};

export default DocPage;
