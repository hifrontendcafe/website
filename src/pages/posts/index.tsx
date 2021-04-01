import { GetStaticProps } from 'next';
import Link from 'next/link';

import Hero from '../../components/Hero';
import Layout from '../../components/Layout';

import { getAllPosts, getSettings } from '../../lib/api';
import { Post, Settings } from '../../lib/types';
import { usePreviewSubscription } from '../../lib/sanity';
import { postsQuery } from '../../lib/queries';

type PostsPageProps = {
  data: Post[];
  preview?: boolean;
  settings: Settings;
};

const PostsPage: React.FC<PostsPageProps> = ({ data, preview, settings }) => {
  const { data: posts } = usePreviewSubscription(postsQuery, {
    initialData: data,
    enabled: preview,
  });

  return (
    <Layout
      title="Entradas"
      description="Blog"
      preview={preview}
      settings={settings}
    >
      <Hero title="Entradas" background={settings?.heroBackground} />
      <div className="bg-indigo-100 sm:pt-10 pb-24">
        <div className=" container mx-auto min-h-screen bg-white overflow-hidden shadow rounded-lg">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div></div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:tr uncate">
                  Últimas entradas
                </h2>
              </div>
            </div>
          </div>
          <div className="px-6 py-5 text-gray-700">
            <ul className="text-lg">
              {posts?.map(({ title, slug, excerpt }) => (
                <li className="hover:text-teal-400 list-none" key={title}>
                  <Link href={`/posts/${slug.current}`}>
                    <a>
                      {title}: {excerpt}
                    </a>
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
  const data = await getAllPosts(preview);
  const settings = await getSettings();
  return {
    props: { data, preview, settings },
    revalidate: 1,
  };
};

export default PostsPage;
