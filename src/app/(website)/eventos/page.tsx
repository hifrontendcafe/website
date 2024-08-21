import EventList from '@/components/EventList';
import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/sanity/page/getPageByName';
import { getPageMetadata } from '@/lib/seo';

export const generateMetadata = () => getPageMetadata('Eventos');

export default async function EventsPage() {
  const page = await getPageByName({ name: 'Eventos' });

  return (
    <>
      <SectionHero title={page.title} />

      <EventList />
    </>
  );
}
