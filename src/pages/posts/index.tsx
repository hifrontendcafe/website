// index.js
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/api';
import { Post } from '../../lib/types';

interface PostsPageProps {
  posts: Post[];
}

const Index: React.FC<PostsPageProps> = ({ posts }) => {
  return (
    <Layout
      title="Entradas"
      description="Blog"
    >
      <Hero small title="Entradas" />
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
              {posts.map(({ title, slug, excerpt }) => (
                <li className="hover:text-teal-400 list-none" key={title}>
                  <Link href={`/posts/${slug.current}`}>
                    <a>{title}: {excerpt}</a>
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: { posts },
    revalidate: 1,
  };
};

export default Index;
