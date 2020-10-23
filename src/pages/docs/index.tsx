// index.js
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout';
import { getAllDocs } from '../../lib/api';
import { Post } from '../../lib/types';

interface DocsPageProps {
  docs: Post[];
}

const Index: React.FC<DocsPageProps> = ({ docs }) => {
  return (
    <Layout
      title="Docs"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
    >
      <Hero small title="Docs" />
      <div className="bg-indigo-100 sm:pt-10 pb-24">
        <div className=" container mx-auto min-h-screen bg-white overflow-hidden shadow rounded-lg">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div></div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:tr uncate">
                  Documentos Útiles
                </h2>
              </div>
            </div>
          </div>
          <div className="px-12 py-5 text-gray-700">
            <ul className="list-disc text-lg">
              {docs.map(({ _id, title, slug }) => (
                <li className="hover:text-teal-400" key={_id}>
                  <Link href="/docs/[slug]" as={`/docs/${slug.current}`}>
                    <a>{title}</a>
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
  const docs = await getAllDocs();
  return {
    props: { docs },
    revalidate: 1,
  };
};

export default Index;
