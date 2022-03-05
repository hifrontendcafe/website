import { GetStaticProps } from 'next';
import { getEventsByCategory, getSettings, getPageByHero } from '@/lib/api';
import Layout from '../../components/Layout';
import EventPreview from '../../components/EventPreview';
import { Event, Page } from '../../lib/types';
import SectionHero from '@/components/SectionHero';

type EnglishPageProps = {
  upcomingEvents: Event[];
  preview?: boolean;
  page: Page;
};

const EnglishPage: React.FC<EnglishPageProps> = ({ upcomingEvents, page }) => {
  return (
    <Layout
      title={page.title}
      description={page.shortDescription}
      metadata={page.metadata}
    >
      <SectionHero
        title={page.title}
        paragraph={page.description}
        cta={page.doc}
      />
      <div className="text-zinc-200 md:px-8 sm:px-6 md:pt-8">
        {upcomingEvents.length > 0 && (
          <div>
            <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventPreview key={event.slug} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings(preview);
  const page = await getPageByHero(preview, 'Inglés');
  const upcomingEvents = await getEventsByCategory(
    preview,
    'Práctica de inglés',
  );
  return {
    props: { upcomingEvents, preview, settings, page },
    revalidate: 1,
  };
};

export default EnglishPage;
