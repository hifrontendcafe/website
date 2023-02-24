import EventList from '@/components/EventList';
import SectionHero from '@/components/SectionHero';
import { getAllEvents, getPageByName } from '@/lib/api.server';
import { getPageMetadata } from '@/lib/seo';

export const revalidate = 1;

export const generateMetadata = () => getPageMetadata('Eventos');

export default async function EventsPage() {
  const [page, events] = await Promise.all([
    getPageByName('Eventos'),
    getAllEvents(),
  ]);

  return (
    <>
      <SectionHero title={page.title} />
      <EventList events={events} />
    </>
  );
}
