import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';

import Layout from '../../components/Layout';
import Hero from '../../components/Hero';

import { getPost, getAllPostsSlugs, getSettings } from '../../lib/api';
import { usePreviewSubscription } from '../../lib/sanity';
import { Post } from '../../lib/types';
import { postQuery } from '../../lib/queries';
import { useSettings } from '@/lib/settings';

type PostPageProps = {
  data: Post;
  preview?: boolean;
};

const PostPage: React.FC<PostPageProps> = ({ data, preview }) => {
  const router = useRouter();
  const { data: post, loading } = usePreviewSubscription(postQuery, {
    params: { slug: data?.slug.current },
    initialData: data,
    enabled: preview,
  });
  const {
    heroSubtitle,
    heroDescription,
    discordButtonLabel,
    iniciativasButtonText,
  } = useSettings();

  if (!router.isFallback && !data?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback || loading) return <div>Cargando...</div>;

  return (
    <Layout title={post.title} preview={preview}>
      <Hero
        title="Posts"
        subtitle={heroSubtitle}
        description={heroDescription}
        discordButtonLabel={discordButtonLabel}
        iniciativasButtonText={iniciativasButtonText}
      />
      <div className="pb-24 bg-zinc-900 sm:pt-10">
        <div className="min-h-screen overflow-hidden bg-white rounded-lg shadow ">
          <div className="px-4 py-5 border-b border-zinc-500 sm:px-6">
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:tr uncate">
                  {post.title}
                </h2>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 italic text-zinc-600">{post.excerpt}</div>

          <div className="px-8 py-2 text-zinc-700">
            <BlockContent blocks={post.content} />
          </div>
          {post.coverImage && (
            <div>
              <img src={post.coverImage} alt={post.title} />
            </div>
          )}
          <div className="flex items-center px-8 py-12">
            <img
              className="w-20 h-20 bg-zinc-300 rounded-full"
              src={post.author.picture}
              title={post.author.name}
              alt={post.author.name}
            />
            <span className="px-4 text-lg">{post.author.name}</span>
          </div>

          <div className="px-6 text-center">
            <Link href="/posts">Volver</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostsSlugs();

  const paths = slugs?.map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const data = await getPost(params.slug as string, preview);
  const settings = await getSettings(preview);

  return {
    props: { data, preview, settings },
    revalidate: 1,
  };
};

export default PostPage;
