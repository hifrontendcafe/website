import { GetStaticProps } from 'next';

import MentorList from '../../components/MentorList';
import Layout from '../../components/Layout';

import { MentorCalomentor, Topic } from '../../lib/types';
import { getMentoringTopics, getSettings } from '@/lib/api';
import { mentorsQuery, mentorsTopicsQuery } from '../../lib/queries';
import { usePreviewSubscription } from '../../lib/sanity';
import SectionHero from '@/components/SectionHero';
import { getMentorList } from '@/lib/calomentorApi';

type MentorshipsPageProps = {
  mentors: MentorCalomentor[];
  preview?: boolean;
};

const MentorshipsPage: React.FC<MentorshipsPageProps> = ({
  mentors,
  preview,
}) => {
  return (
    <Layout
      title="Mentorías"
      description="El programa de mentorías de FrontendCafé  busca servirte de guía en este camino, conectándote con profesionales y referentes capacitados en los múltiples y diversos temas que engloba el universo de las tecnologías de la información."
      preview={preview}
    >
      <SectionHero
        title="Mentorías"
        paragraph="Conéctate con profesionales y referentes capacitados en los múltiples y diversos temas que engloba el universo de las tecnologías de la información."
        cta="https://frontend.cafe/docs/guia-para-realizar-mentorias"
      />
      <MentorshipsSteps />
      <MentorList mentors={mentors} />
    </Layout>
  );
};

const MentorshipsSteps: React.FC = () => {
  return (
    <section className="text-gray-100 body-font">
      <div className="px-5 py-32">
        <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 sm:-m-4">
          <div className="flex flex-col items-center mb-6 text-center md:p-4 md:w-1/3 md:mb-0 ">
            <div className="flex-grow text-left">
              <h2 className="mb-3 text-2xl font-medium title-font">
                1 Inicia sesión
              </h2>
              <p className="text-lg leading-relaxed text-left">
                Recuerda que para solicitar una mentoría debes ser parte del
                servidor de Discord de FrontendCafé.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center mb-6 text-center md:p-4 md:w-1/3 md:mb-0 ">
            <div className="flex-grow text-left">
              <h2 className="mb-3 text-2xl font-medium title-font">
                2 Encuentra un mentor
              </h2>
              <p className="text-lg leading-relaxed">
                Encuentra un mentor cuyo perfil se ajuste a tus intereses y
                sientas que pueda ayudarte en lo que necesites.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center mb-6 text-center md:p-4 md:w-1/3 md:mb-0 ">
            <div className="flex-grow text-left">
              <h2 className="mb-3 text-2xl font-medium title-font">
                3 Agenda la mentoría
              </h2>
              <p className="mb-2 text-lg leading-relaxed">
                Contacta al mentor a través de su agenda virtual y reserva una
                fecha y hora entre las disponibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const mentors = await getMentorList();
  const settings = await getSettings(preview);

  return {
    props: { mentors, preview, settings },
    revalidate: 1,
  };
};

export default MentorshipsPage;
