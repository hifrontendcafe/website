import { GetStaticProps } from 'next';
import { getLatestEventByCategory, getSettings } from '../../lib/api';
import Layout from '../../components/Layout';
import EventPreview from '../../components/EventPreview';
import JoinSection from '../../components/JoinSection';
import { Event, Settings } from '../../lib/types';

type EnglishPageProps = {
  upcomingEvent: Event;
  settings: Settings;
  preview?: boolean;
};

const EnglishPage: React.FC<EnglishPageProps> = ({
  upcomingEvent,
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
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-4xl pt-4 mt-0 md:my-4 font-semibold">
              🌎 Práctica de inglés
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
            <img
              className="rounded-md overflow-hidden shadow-md"
              src="img/english-talk.svg"
              alt=""
            />
          </div>

          {upcomingEvent && <EventPreview event={upcomingEvent} />}
        </div>
        <JoinSection />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings();
  const upcomingEvent = await getLatestEventByCategory(
    preview,
    'Práctica de inglés',
  );
  return {
    props: { upcomingEvent, preview, settings },
    revalidate: 1,
  };
};

export default EnglishPage;
