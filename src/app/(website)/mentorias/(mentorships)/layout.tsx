import { PageComponents } from '@/components/Page/Matcher';
import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/api.server';

async function MentorshipsLayout({ children }: { children: React.ReactNode }) {
  const page = await getPageByName({ name: 'Mentorías' });

  return (
    <main>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />
      <PageComponents components={page.components} />
      {children}
    </main>
  );
}

export default MentorshipsLayout;
