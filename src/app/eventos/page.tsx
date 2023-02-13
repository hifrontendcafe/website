import EventList from '@/components/EventList';
import SectionHero from '@/components/SectionHero';
import { use } from 'react';
import { getAllEvents, getPageByName } from '@/lib/api.server';
import { getPageMetadata } from '@/lib/seo';

export const revalidate = 1;

export const generateMetadata = () => getPageMetadata('Eventos');

export default function EventsPage() {
  const page = use(getPageByName('Eventos'));
  const events = use(getAllEvents());

  return (
    <>
      <SectionHero title={page.title} />
      <EventList events={events} />
    </>
  );
}
