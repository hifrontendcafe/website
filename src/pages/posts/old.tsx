import { GetStaticProps } from 'next';
import Link from 'next/link';

import Hero from '../../components/Hero';
import Layout from '../../components/Layout';

import { getAllPosts, getSettings } from '@/lib/api';
import { useSettings } from '@/lib/settings';
import { postsQuery } from '../../lib/queries';
import { usePreviewSubscription } from '../../lib/sanity';
import { Post } from '../../lib/types';

type PostsPageProps = {
  data: Post[];
  preview?: boolean;
};

const PostsPage: React.FC<PostsPageProps> = ({ data, preview }) => {
  const { data: posts } = usePreviewSubscription(postsQuery, {
    initialData: data,
    enabled: preview,
  });

  const {
    heroSubtitle,
    heroDescription,
    discordButtonLabel,
    iniciativasButtonText,
  } = useSettings();

  return (
    <Layout title="Entradas" description="Blog" preview={preview}>
      <Hero
        heroWords="Entradas"
        subtitle={heroSubtitle}
        description={heroDescription}
        discordButtonLabel={discordButtonLabel}
        iniciativasButtonText={iniciativasButtonText}
      />
      <div className="pb-24 bg-zinc-900 sm:pt-10">
        <div className="min-h-screen overflow-hidden bg-white rounded-lg shadow ">
          <div className="px-4 py-5 border-b border-zinc-500 sm:px-6">
            <div></div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:tr uncate">
                  Últimas entradas
                </h2>
              </div>
            </div>
          </div>
          <div className="px-6 py-5 text-zinc-700">
            <ul className="text-lg">
              {posts?.map(({ title, slug, excerpt }) => (
                <li className="list-none hover:text-teal-400" key={title}>
                  <Link href={`/posts/${slug.current}`}>
                    {title}:{excerpt}
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
  // disable posts in production, possible future feature
  if (process.env.NODE_ENV === 'production') {
    return { notFound: true, revalidate: 500 };
  }

  const [data, settings] = await Promise.all([
    getAllPosts(preview).catch((err) => {
      console.error(err);
      return null;
    }),
    getSettings(preview).catch((err) => {
      console.error(err);
      return null;
    }),
  ]);

  return {
    props: { data, preview, settings },
    revalidate: 60,
  };
};

export default PostsPage;