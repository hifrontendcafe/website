import { GetStaticProps } from 'next';
import { getEventsByCategory, getSettings } from '@/lib/api';
import Layout from '../../components/Layout';
import EventPreview from '../../components/EventPreview';
import { Event } from '../../lib/types';
import SectionHero from '@/components/SectionHero';

type EnglishPageProps = {
  upcomingEvents: Event[];
  preview?: boolean;
};

const EnglishPage: React.FC<EnglishPageProps> = ({ upcomingEvents }) => {
  return (
    <Layout
      title="Inglés"
      description="Únete a nuestras charlas de inglés en Discord"
    >
      <SectionHero
        title="Prácticas de inglés"
        paragraph="Charlas abiertas con el objetivo de perder el miedo a
              hablar en público, ganar confianza, fluidez y divertirnos en comunidad"
        cta="https://frontend.cafe/docs/practicas-de-ingles"
      />
      <div className="pt-16 text-gray-200 md:px-8 sm:px-6 md:pt-8">
        {upcomingEvents.length > 0 && (
          <div>
            <div className="flex flex-wrap">
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

  const upcomingEvents = await getEventsByCategory(
    preview,
    'Práctica de inglés',
  );
  return {
    props: { upcomingEvents, preview, settings },
    revalidate: 1,
  };
};

export default EnglishPage;
