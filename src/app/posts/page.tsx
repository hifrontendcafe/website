import { getAllPosts } from '@/lib/api.server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

export const revalidate = 10;

export default function PostsPage() {
  const posts = use(getAllPosts());

  if (process.env.NODE_ENV === 'production') return notFound();

  return (
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
  );
}
