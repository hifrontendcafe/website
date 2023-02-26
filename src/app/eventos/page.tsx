import EventList from '@/components/EventList';
import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/api.server';
import { getPageMetadata } from '@/lib/seo';

export const generateMetadata = () => getPageMetadata('Eventos');

export default async function EventsPage() {
  const page = await getPageByName({ name: 'Eventos' });

  return (
    <>
      <SectionHero title={page.title} />

      {/* @ts-expect-error Server Component */}
      <EventList />
    </>
  );
}
