import type { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import EventList from '../components/EventList';

import { Event, Page } from '../lib/types';
import { getAllEvents, getSettings, getPageByName } from '../lib/api';
import { usePreviewSubscription } from '../lib/sanity';
import { eventsQuery } from '../lib/queries';
import SectionHero from '@/components/SectionHero';

type EventsPageProps = {
  data: Event[];
  preview?: boolean;
  page: Page;
};

const EventsPage: React.FC<EventsPageProps> = ({ data, preview, page }) => {
  const { data: events } = usePreviewSubscription(eventsQuery, {
    initialData: data,
    enabled: preview,
  });

  return (
    <Layout
      title={page.title}
      description={page.shortDescription}
      metadata={page.metadata}
      preview={preview}
    >
      <SectionHero title={page.title} />
      <EventList events={events} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllEvents(preview);
  const settings = await getSettings(preview);
  const page = await getPageByName(preview, 'Eventos');
  console.log(page);

  return {
    props: { data, preview, settings, page },
    revalidate: 1,
  };
};

export default EventsPage;
