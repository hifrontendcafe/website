import Layout from '../components/Layout';
import { GetStaticProps } from 'next';
import { Event } from '../lib/types';
import { getAllEvents } from '../lib/api';
import Hero from '../components/Hero';
import EventList from '../components/EventList';

interface EventsPageProps {
  events: Event[];
}

const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
  return (
    <Layout
      title="Eventos"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
    >
      <Hero
        small
        title="Eventos"
        subtitle="Charlas, workshops, afters, entrevistas ~"
      />
      <EventList events={events} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const events = await getAllEvents(preview);
  return {
    props: { events },
    revalidate: 1,
  };
};

export default EventsPage;
