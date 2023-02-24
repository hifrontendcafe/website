import CMYKEditionsTabs from '@/components/CMYKEditions/Tabs';
import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/api.server';
import { getPageMetadata } from '@/lib/seo';

export const generateMetadata = () => getPageMetadata('CMYK');

export default async function CMYKLayout({ children }) {
  const page = await getPageByName('CMYK');

  return (
    <>
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />

      <CMYKEditionsTabs />

      {children}
    </>
  );
}
