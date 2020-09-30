import { GetStaticProps } from 'next';
import { Event, Tweet } from '../lib/types';
import { getAllEvents } from '../lib/api';
import { getRecentTweets } from '../lib/twitter';
import Layout from '../components/Layout';
import HomeHero from '../components/HomeHero';
import EventList from '../components/EventList';
import TwitterFeed from '../components/TwitterFeed';

export interface CalendarPageProps {
  events: Event[];
  tweets: Tweet[];
  preview: boolean;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ events, preview, tweets }) => {
  return (
    <Layout preview={preview}>
      <HomeHero />
      <EventList events={events} />
      <TwitterFeed tweets={tweets} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const events = await getAllEvents(preview);
  const tweets = await getRecentTweets('frontendcafe');
  return {
    props: { events, preview, tweets },
    revalidate: 1,
  };
};

export default CalendarPage;
