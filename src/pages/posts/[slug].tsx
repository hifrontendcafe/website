import { GetStaticPaths, GetStaticProps } from 'next';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
import { Post } from '../../lib/types';
import { getPost, getAllPostsWithSlugOnly } from '../../lib/api';
import styles from '../docs/styles.module.css';

interface PostPageProps {
  post: Post;
  preview: boolean;
}

const PostPage: React.FC<PostPageProps> = ({ post, preview }) => {
  return (
    <Layout>
      <Hero small title="Posts" />
      <div className="bg-indigo-100 sm:pt-10 pb-24">
        <div className=" container mx-auto min-h-screen bg-white overflow-hidden shadow rounded-lg">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:tr uncate">
                  {post.title}
                </h2>
              </div>
            </div>
          </div>
          <div className={`px-12 py-5 text-gray-700 ${styles.body}`}>
            <BlockContent blocks={post.content} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const data = await getPost(params.slug, preview);
  return {
    props: {
      preview,
      post: data?.post || null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlugOnly();
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  };
};

export default PostPage;
