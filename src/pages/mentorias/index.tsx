import { GetStaticProps } from 'next';

import MentorList from '../../components/MentorList';
import MentorshipsHero from '../../components/MentorshipsHero';
import Layout from '../../components/Layout';

import { Mentor, Topic } from '../../lib/types';
import { getAllMentors, getMentoringTopics } from '../../lib/api';
import { mentorsQuery, mentorsTopicsQuery } from '../../lib/queries';
import { usePreviewSubscription } from '../../lib/sanity';
import { getLayout } from '@/utils/get-layout';
import { getAllMentorSchedules } from '@/lib/calomentorAPI';

type MentorshipsPageProps = {
  mentors: Mentor[];
  topics: Topic[];
  preview?: boolean;
  mentorsSchedule: unknown;
};

const MentorshipsPage: React.FC<MentorshipsPageProps> = ({
  topics: topicsData,
  mentors: mentorsData,
  preview,
  mentorsSchedule,
}) => {
  console.log(
    '🚀 ~ file: index.tsx ~ line 27 ~ mentorsSchedule',
    mentorsSchedule,
  );
  const { data: mentors } = usePreviewSubscription(mentorsQuery, {
    initialData: mentorsData,
    enabled: preview,
  });

  const { data: topics } = usePreviewSubscription(mentorsTopicsQuery, {
    initialData: topicsData,
    enabled: preview,
  });

  return (
    <Layout
      title="Mentorías"
      description="El programa de mentorías de FrontendCafé  busca servirte de guía en este camino, conectándote con profesionales y referentes capacitados en los múltiples y diversos temas que engloba el universo de las tecnologías de la información."
      preview={preview}
    >
      <MentorshipsHero />
      <MentorshipsSteps />
      <MentorList topics={topics} mentors={mentors} />
    </Layout>
  );
};

const MentorshipsSteps: React.FC = () => {
  return (
    <section className="text-gray-700 bg-indigo-50 body-font">
      <div className="container px-5 py-32 mx-auto">
        <div className="mb-20 text-center">
          <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            ¿Por dónde empiezo? 🤔
          </h1>
          <p className="mx-auto text-base leading-relaxed text-left xl:w-2/4 lg:w-3/4">
            El procedimiento para sumarte a las mentorías de FrontendCafé consta
            de tres simples pasos, resumidos en <strong>encontrar</strong> tu
            mentor, <strong>coordinar</strong> un encuentro y{' '}
            <strong>prepararte</strong> para la mentoría.
          </p>
          <div className="flex justify-center mt-6">
            <div className="inline-flex w-16 h-1 rounded-full bg-secondary"></div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 sm:-m-4">
          <div className="flex flex-col items-center p-4 mb-6 text-center transition duration-500 ease-in-out transform cursor-pointer md:w-1/3 md:mb-0 hover:-translate-y-6 hover:scale-105">
            <img
              className="object-cover object-center w-64 rounded "
              alt="schedule"
              src="img/engines-bro.svg"
            />
            <div className="flex-grow text-left">
              <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                <strong>Paso 1:</strong> Encontrá tu mentor 🔍👀
              </h2>
              <p className="text-base leading-relaxed text-left">
                El primer paso es encontrar un mentor cuyo perfil se ajuste a
                tus intereses y sientas que pueda ayudarte en lo que necesites.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4 mb-6 text-center transition duration-500 ease-in-out transform cursor-pointer md:w-1/3 md:mb-0 hover:-translate-y-6 hover:scale-105">
            <img
              className="object-cover object-center w-64 rounded"
              alt="schedule"
              src="img/schedule-bro.svg"
            />
            <div className="flex-grow text-left">
              <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                <strong>Paso 2:</strong> Coordiná un encuentro 📅✔️
              </h2>
              <p className="text-base leading-relaxed">
                Luego, deberás contactar a los mentores a través de sus agendas
                virtuales y reservar una fecha y hora entre las disponibles. Al
                concertar el encuentro, podés enviar un adelanto de las dudas
                que buscás resolver.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4 mb-6 text-center transition duration-500 ease-in-out transform cursor-pointer md:w-1/3 md:mb-0 hover:-translate-y-6 hover:scale-105">
            <img
              className="object-cover object-center w-64 rounded"
              alt="schedule"
              src="img/reading-bro.svg"
            />

            <div className="flex-grow text-left">
              <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                <strong>Paso 3:</strong> Preparate para la mentoría 📝⏳
              </h2>
              <p className="mb-2 text-base leading-relaxed">
                Mientras esperás que llegue la fecha acordada, podés enviar
                consultas a tu mentor para ayudar a prepararnos mejor y
                aprovechar el tiempo al máximo.
              </p>
              <p>¡Recordá ser puntual! ⌚</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const mentors = await getAllMentors(preview);
  const topics = await getMentoringTopics(preview);
  const mentorsSchedule = await getAllMentorSchedules();
  const { dehydratedState } = await getLayout({ preview });
  return {
    props: { mentors, topics, preview, dehydratedState, mentorsSchedule },
    revalidate: 1,
  };
};

export default MentorshipsPage;
