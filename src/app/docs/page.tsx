import Link from 'next/link';

import { getAllDocs } from '@/lib/api.server';
import { getMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  getMetadata({
    title: 'Docs',
    description:
      'Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología.',
  });

export default async function DocsPage() {
  const docs = await getAllDocs({
    cache: 'force-cache',
    next: { revalidate: 60 },
  });

  return (
    <section className="mt-20 pb-40">
      <div className="divide-y divide-zinc-500 rounded-lg border-2 border-zinc-500 bg-zinc-800 shadow">
        <h2 className="p-5 text-xl font-bold">Documentos Útiles</h2>
        <ul className="space-y-3 p-5 text-lg text-tertiary">
          {docs?.map(({ title, slug }) => (
            <li key={slug}>
              <Link href={`/docs/${slug}`} className="hover:text-informational">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
