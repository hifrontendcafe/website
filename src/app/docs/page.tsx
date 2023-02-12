import { use } from 'react';
import Link from 'next/link';

import { getAllDocs } from '@/lib/api.server';

export const revalidate = 60;

export default function DocsPage() {
  const docs = use(getAllDocs());

  return (
    <div className="pb-40 sm:pt-10">
      <div className="mt-10 overflow-hidden border-2 border-zinc-500 rounded-lg shadow bg-zinc-800">
        <div className="px-4 py-5 border-b border-zinc-500 sm:px-6">
          <div></div>
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:tr uncate">
                Documentos Útiles
              </h2>
            </div>
          </div>
        </div>
        <div className="py-5 px-7 text-tertiary">
          <ul className="text-lg">
            {docs?.map(({ title, slug }) => (
              <li className="hover:text-informational" key={slug}>
                <Link href={`/docs/${slug}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
