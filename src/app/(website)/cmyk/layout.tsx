import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/api.server';

export default async function CMYKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const page = await getPageByName({
    name: 'CMYK',
    next: {
      revalidate: 60,
    },
  });

  return (
    <main>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />

      {children}
    </main>
  );
}
