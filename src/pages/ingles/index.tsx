import { GetStaticProps } from 'next';
import { getEventsByCategory, getSettings } from '../../lib/api';
import Layout from '../../components/Layout';
import EventPreview from '../../components/EventPreview';
import JoinSection from '../../components/JoinSection';
import { Event, Settings } from '../../lib/types';

type EnglishPageProps = {
  upcomingEvents: Event[];
  settings: Settings;
  preview?: boolean;
};

const EnglishPage: React.FC<EnglishPageProps> = ({
  upcomingEvents,
  settings,
}) => {
  return (
    <Layout
      title="Inglés"
      description="Únete a nuestras charlas de inglés en Discord"
      settings={settings}
    >
      <div className="container px-4 sm:px-6 mx-auto pt-16 md:pt-0">
        <div className="flex justify-between flex-wrap pb-8">
          <div className="max-w-xl">
            <h1 className="text-2xl md:text-4xl pt-4 mt-0 md:my-4 font-semibold">
              🌎 Práctica de Inglés
            </h1>
            <p>
              Nos divertimos charlando con el objetivo de perder el miedo a
              hablar en inglés en Público. Mejorando la comunicación y la
              confianza, divertiéndonos y conectandonos.
            </p>
            <br />
            <ul className="list-inside list-disc">
              <li>Puedes ingresar desde cualquier nivel.</li>
              <li>Son encuentros online gratis.</li>
              <li>No necesitas inscribirte.</li>
              <li>Sucede desde el mismo canal de discord.</li>
            </ul>
            <br />
          </div>
          <img
            className="rounded-md overflow-hidden shadow-md mt-8"
            src="img/english-talk.svg"
            alt="english session preview on discord"
          />
        </div>
        {upcomingEvents.length > 0 && (
          <div>
            <h1 className="text-2xl md:text-4xl pt-4 mt-0 md:my-4 font-semibold">
              Próximos Eventos
            </h1>
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
  const settings = await getSettings();
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