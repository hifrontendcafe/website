import EventList from '@/components/EventList';
import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/api.server';
import { getPageMetadata } from '@/lib/seo';

export const revalidate = 1;

export const generateMetadata = () => getPageMetadata('Eventos');

export default async function EventsPage() {
  const page = await getPageByName('Eventos');

  return (
    <>
      <SectionHero title={page.title} />

      {/* @ts-expect-error Server Component */}
      <EventList />
    </>
  );
}
