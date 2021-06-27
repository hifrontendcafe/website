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
      <div style={{backgroundColor: '#f7f7f7'}}>
        <div className="container mx-auto flex px-5 py-16 flex-col items-start0">
          {
            infoStep.map((s, key) => {
              return <MentorshipStep number={s.number} textStep={s.textStep} key={key}/>
            })
          }
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
