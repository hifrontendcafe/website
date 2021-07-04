import Link from 'next/link';
import { GetStaticProps } from 'next';

import MentorList from '../../components/MentorList';
import MentorshipsHero from '../../components/MentorshipsHero';
import Layout from '../../components/Layout';

import { Mentor, Topic } from '../../lib/types';
import { getAllMentors, getMentoringTopics } from '../../lib/api';
import { mentorsQuery, mentorsTopicsQuery } from '../../lib/queries';
import { usePreviewSubscription } from '../../lib/sanity';
import { getLayout } from '@/utils/get-layout';
import MentorshipStep from '@/components/MentorshipStep';

type MentorshipsPageProps = {
  mentors: Mentor[];
  topics: Topic[];
  preview?: boolean;
};

const MentorshipsPage: React.FC<MentorshipsPageProps> = ({
  topics: topicsData,
  mentors: mentorsData,
  preview,
}) => {
  const { data: mentors } = usePreviewSubscription(mentorsQuery, {
    initialData: mentorsData,
    enabled: preview,
  });

  const { data: topics } = usePreviewSubscription(mentorsTopicsQuery, {
    initialData: topicsData,
    enabled: preview,
  });

  const infoStep = [
    {
        number: 1,
        textStep: 'Lo primero es encontrar un mentor cuyo perfil se ajuste a tus intereses y con el que sientas que puede ayudarte en lo que necesitas.'
    },
    {
        number: 2,
        textStep: 'Luego, debes contactar a los mentores y reservar la fecha y el horario, adjuntando un formulario con tus datos personales.'
    },
    {
        number: 3,
        textStep: 'Por último, agrega las dudas puntuales que buscas resolver para ayudarlos a prepararse mejor y así aprovechar el tiempo al máximo.'
    }
  ]

  return (
    <Layout
      title="Mentorías"
      description="El programa de mentorías de FrontendCafé  busca servirte de guía en este camino, conectándote con profesionales y referentes capacitados en los múltiples y diversos temas que engloba el universo de las tecnologías de la información."
      preview={preview}
    >
      <MentorshipsHero />
      <div className="py-16 flex flex-col justify-center lg:flex-row" style={{backgroundColor: '#f7f7f7'}}>
        <div className="container mx-auto flex px-5 pb-4 flex-col items-center lg:items-start md:px-20">
          <h2 className="inline-block lg:hidden text-3xl lg:text-5xl font-black text-center pb-6 text-gray-800">
            ¿Por dónde empiezo?
          </h2>
          {
            infoStep.map((s, key) => {
              return <MentorshipStep number={s.number} textStep={s.textStep} key={key}/>
            })
          }
        </div>
        <div className="container mx-auto px-10 pt-4 flex flex-col items-center lg:items-end text-center lg:text-right">
          <div className="pb-10 text-gray-800">  
            <h2 className="hidden lg:inline-block text-3xl lg:text-5xl font-black pb-10 leading-10">A tener en cuenta</h2>
            <p>
              Las mentorías son exclusivas para miembros de <strong className="font-bold">FRONTEND</strong>
              <strong className="font-semibold">CAFE</strong> ya que suceden en nuestro servidor de Discord.
              Asegúrate de poder compromenterte con el mentor antes de hacer la reserva, ¡y
              recuerda ser puntual!
              <br /><br />
              Si tienes más dudas puedes hacerlas dentro del canal de #📚︱consultas-mentorias.
            </p>
          </div>
          <Link href="https://discord.gg/frontendcafe">
            <a
              target="_blank"
              className="bg-secondary hover:bg-secondarydark text-white text-center font-bold py-2 px-4 rounded my-3 block w-80"
              style={{ transition: 'all .15s ease' }}
            >
              Súmate a Discord
            </a>
          </Link>
        </div>
      </div>
      <MentorList topics={topics} mentors={mentors} />
    </Layout>
  );
};


export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const mentors = await getAllMentors(preview);
  const topics = await getMentoringTopics(preview);
  const { dehydratedState } = await getLayout({ preview });

  return {
    props: { mentors, topics, preview, dehydratedState },
    revalidate: 1,
  };
};

export default MentorshipsPage;
