import { GetStaticProps } from 'next';
import { getEventsByCategory } from '../../lib/api';
import Layout from '../../components/Layout';
import EventPreview from '../../components/EventPreview';
import JoinSection from '../../components/JoinSection';
import { Event } from '../../lib/types';
import { getSettings } from '@/utils/get-layout';

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
      <div className="container px-8 pt-16 mx-auto sm:px-6 md:pt-8">
        <div className="flex flex-wrap items-center justify-between py-8">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="title lg:text-4xl xl:title">
              Práctica de inglés 🌎
            </h1>
            <p>
              Nos divertimos charlando con el objetivo de perder el miedo a
              hablar en inglés en público. Mejorando la comunicación y la
              confianza, divirtiéndonos y conectándonos.
            </p>
            <br />
            <ul className="pl-1 list-none list-inside">
              <li>✔️ Puedes ingresar desde cualquier nivel</li>
              <li>✔️ Son encuentros online gratis</li>
              <li>✔️ No necesitas inscribirte</li>
              <li>✔️ Sucede desde el mismo canal de discord</li>
            </ul>
            <br />
          </div>
          <div className="hidden lg:w-1/2 xl:w-1/2 md:block">
            <img
              className="rounded-md shadow-md"
              src="img/english-talk.svg"
              alt="english session preview on discord"
            />
          </div>
        </div>
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
  const { dehydratedState } = await getSettings({ preview });
  const upcomingEvents = await getEventsByCategory(
    preview,
    'Práctica de inglés',
  );
  return {
    props: { upcomingEvents, preview, dehydratedState },
    revalidate: 1,
  };
};

export default EnglishPage;
