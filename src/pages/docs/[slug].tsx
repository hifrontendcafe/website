import { GetStaticPaths, GetStaticProps } from 'next';
import BlockContent from '@sanity/block-content-to-react';

import Hero from '../../components/Hero';
import Layout from '../../components/Layout';

import { getAllDocs, getDocBySlug } from '../../lib/api';
import styles from './styles.module.css';
import { Post } from '../../lib/types';

interface PostProps {
  title: string;
  body: string;
}

const DocPage: React.FC<PostProps> = ({ title, body }) => {
  return (
    <Layout title={title}>
      <Hero small title="Docs" />
      <div className="bg-indigo-100 sm:pt-10 pb-24">
        <div className=" container mx-auto min-h-screen bg-white overflow-hidden shadow rounded-lg">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div></div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:tr uncate">
                  {title}
                </h2>
              </div>
            </div>
          </div>
          <div className={`px-12 py-5 text-gray-700 ${styles.body}`}>
            <BlockContent blocks={body} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllDocs();

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const doc = await getDocBySlug(params.slug);
  return {
    props: { ...doc },
    revalidate: 1,
  };
};

export default DocPage;
