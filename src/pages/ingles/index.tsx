import { GetStaticProps } from 'next';
import { getLatestEventByCategory } from '../../lib/api';
import Layout from '../../components/Layout';
import EventPreview from '../../components/EventPreview';
import JoinSection from '../../components/JoinSection';
import { Event } from '../../lib/types';

type EnglishPageProps = {
  upcomingEvent: Event;
  preview?: boolean;
};

const EnglishPage: React.FC<EnglishPageProps> = ({ upcomingEvent }) => {
  return (
    <Layout
      title="Inglés"
      description="Únete a nuestras charlas de inglés en Discord"
    >
      <div className="container px-4 sm:px-6 mx-auto pt-16 md:pt-0">
        <div className="flex justify-between flex-wrap pb-8">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-4xl pt-4 mt-0 md:my-4 font-semibold">
              🌎 Práctica de inglés
            </h1>
            <p>
              Nos divertimos charlando con el objetivo de perder el miedo a
              hablar en inglés en público. <br />
              <br />
              <strong>¿Cómo? </strong>Mejorando la comunicación y la confianza.
              <br />
              <br />
              Si bien el canal de voz está continuamente abierto y tratamos de
              impulsar conversaciones de manera más espontánea. Desde nuestro
              entorno organizamos encuentros online gratuitos todos los martes
              en Discord. Revisa los próximos eventos para saber la próxima
              fecha!
              <br />
              <br />
            </p>
            <img src="img/english-talk.svg" alt="" />
          </div>

          {upcomingEvent && <EventPreview event={upcomingEvent} />}
        </div>
        <JoinSection />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const upcomingEvent = await getLatestEventByCategory(
    preview,
    'Práctica de inglés',
  );
  return {
    props: { upcomingEvent, preview },
    revalidate: 1,
  };
};

export default EnglishPage;
