import { notFound } from 'next/navigation';
import Link from 'next/link';

import type { AppPage } from '@/lib/types';
import BlockContent from '@/components/BlockContent';
import { getPost, getAllPostsSlugs } from '@/lib/api.server';

export const generateStaticParams = async () => {
  const slugs = await getAllPostsSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
};

export const revalidate = 60;

const PostPage: AppPage<{ slug: string }> = async ({ params }) => {
  const post = await getPost(params.slug);

  if (!post.slug) return notFound();

  return (
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
  );
};

export default PostPage;
