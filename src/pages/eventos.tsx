import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import EventList from '../components/EventList';

import { Event, Settings } from '../lib/types';
import { getAllEvents, getSettings } from '../lib/api';
import { usePreviewSubscription } from '../lib/sanity';
import { eventsQuery } from '../lib/queries';

type EventsPageProps = {
  data: Event[];
  preview?: boolean;
  settings?: Settings;
};

const EventsPage: React.FC<EventsPageProps> = ({ data, preview, settings }) => {
  const { data: events } = usePreviewSubscription(eventsQuery, {
    initialData: data,
    enabled: preview,
  });

  return (
    <Layout
      title="Eventos"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
      preview={preview}
      settings={settings}
    >
      <Hero background={settings?.heroBackground} title="Eventos" />
      <EventList events={events} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings();
  const data = await getAllEvents(preview);
  return {
    props: { data, preview, settings },
    revalidate: 1,
  };
};

export default EventsPage;
