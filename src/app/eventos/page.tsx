import EventList from '@/components/EventList';
import SectionHero from '@/components/SectionHero';
import { use } from 'react';
import { getAllEvents, getPageByName } from '@/lib/api.server';
import { getMetadata } from '@/lib/seo';

export const revalidate = 1;

export const generateMetadata = async () => {
  const page = await getPageByName('Eventos');

  return await getMetadata({
    title: page.title,
    description: page.shortDescription,
  });
};

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
