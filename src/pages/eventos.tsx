import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import EventList from '../components/EventList';

import { Event } from '../lib/types';
import { getAllEvents } from '../lib/api';
import { usePreviewSubscription } from '../lib/sanity';
import { eventsQuery } from '../lib/queries';
import { getLayout } from '../utils/get-layout';

type EventsPageProps = {
  data: Event[];
  preview?: boolean;
};

const EventsPage: React.FC<EventsPageProps> = ({ data, preview }) => {
  const { data: events } = usePreviewSubscription(eventsQuery, {
    initialData: data,
    enabled: preview,
  });

  return (
    <Layout
      title="Eventos"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
      preview={preview}
    >
      <EventList events={events} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllEvents(preview);
  const { dehydratedState } = await getLayout({ preview });
  return {
    props: { data, preview, dehydratedState },
    revalidate: 1,
  };
};

export default EventsPage;
