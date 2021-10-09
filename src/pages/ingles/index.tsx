import { GetStaticProps } from 'next';
import { getEventsByCategory, getSettings } from '@/lib/api';
import Layout from '../../components/Layout';
import EventPreview from '../../components/EventPreview';
import JoinSection from '../../components/JoinSection';
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
        title="Práctica de inglés"
        paragraph="Nos divertimos charlando con el objetivo de perder el miedo a
              hablar en inglés en público. Mejorando la comunicación y la
              confianza, divirtiéndonos y conectándonos."
      />
      <div className="container px-8 pt-16 mx-auto text-gray-200 sm:px-6 md:pt-8">
        {upcomingEvents.length > 0 && (
          <div>
            <div className="flex flex-row gap-3">
              <h1 className="pt-4 mt-0 subtitle md:my-4">Próximos Eventos</h1>
              <img src="/icons/masuno.svg" alt="mas eventos" />
            </div>
            <div className="flex flex-wrap">
              {upcomingEvents.map((event) => (
                <EventPreview key={event.slug} event={event} />
              ))}
            </div>
          </div>
        )}
        <JoinSection />
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
