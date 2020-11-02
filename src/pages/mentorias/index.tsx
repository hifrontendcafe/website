import Layout from '../../components/Layout';
import { GetStaticProps } from 'next';
import { Mentor, Topic } from '../../lib/types';
import { getAllMentors, getMentoringTopics } from '../../lib/api';
import MentorList from '../../components/MentorList';
import Hero from '../../components/Hero';
import MentorshipsHero from '../../components/MentorshipsHero';

interface MentorContainerProps {
  mentors: Mentor[];
  topics: Topic[];
}

const MentorshipsPage: React.FC<MentorContainerProps> = ({
  topics,
  mentors,
}) => {
  return (
    <Layout
      title="Mentorías"
      description="El programa de mentorías de FrontEndCafé busca servirte de guía en este camino, conectándote con profesionales y referentes capacitados en los múltiples y diversos temas que engloba el universo de las tecnologías de la información."
    >
      <Hero
        small
        title="Mentorías"
        subtitle="Buscamos servirte de guía en este camino ~"
      />
      <MentorshipsHero />
      <MentorshipsSteps />
      <MentorList topics={topics} mentors={mentors} />
    </Layout>
  );
};

const MentorshipsSteps: React.FC = () => {
  return (
    <section className=" bg-indigo-100 text-gray-700 body-font">
      <div className="container px-5 py-32 mx-auto">
        <div className="text-center mb-20">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font text-gray-900
            mb-4"
          >
            ¿Por dónde empiezo? 🤔
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            El procedimiento para sumarte a las mentorías de FrontEndCafé consta
            de tres simples pasos, resumidos en <strong>encontrar</strong> tu
            mentor, <strong>coordinar</strong> un encuentro y{' '}
            <strong>prepararte</strong> para la mentoría.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-secondary inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div
            className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col text-center
            items-center transition duration-500 ease-in-out transform hover:-translate-y-6 hover:scale-105 cursor-pointer"
          >
            <img
              className="w-64 object-cover object-center rounded "
              alt="schedule"
              src="img/engines-bro.svg"
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                <strong>Paso 1:</strong> Encontrá tu mentor 🔍👀
              </h2>
              <p className="leading-relaxed text-base">
                El primer paso es encontrar un mentor cuyo perfil se ajuste a
                tus intereses y sientas que pueda ayudarte en lo que necesites.
              </p>
            </div>
          </div>
          <div
            className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col text-center
            items-center transition duration-500 ease-in-out transform hover:-translate-y-6 hover:scale-105 cursor-pointer"
          >
            <img
              className="w-64 object-cover object-center rounded"
              alt="schedule"
              src="img/schedule-bro.svg"
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                <strong>Paso 2:</strong> Coordiná un encuentro 📅✔️
              </h2>
              <p className="leading-relaxed text-base">
                Luego, deberás contactar a los mentores a través de sus agendas
                virtuales y reservar una fecha y hora entre las disponibles. Al
                concertar el encuentro, podés enviar un adelanto de las dudas
                que buscás resolver.
              </p>
            </div>
          </div>
          <div
            className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col text-center
            items-center transition duration-500 ease-in-out transform hover:-translate-y-6 hover:scale-105 cursor-pointer"
          >
            <img
              className="w-64 object-cover object-center rounded"
              alt="schedule"
              src="img/reading-bro.svg"
            />

            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                <strong>Paso 3:</strong> Preparate para la mentoría 📝⏳
              </h2>
              <p className="mb-2 leading-relaxed text-base">
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
  return {
    props: { mentors, topics },
    revalidate: 1,
  };
};

export default MentorshipsPage;
