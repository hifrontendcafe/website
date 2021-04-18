import { GetStaticProps } from 'next';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout';
import { getLayout } from '@/utils/get-layout';

const MentorshipsFeedback: React.FC = () => {
  return (
    <Layout
      title="Mentorías"
      description="El programa de mentorías de FrontendCafé  busca servirte de guía en este camino, conectándote con profesionales y referentes capacitados en los múltiples y diversos temas que engloba el universo de las tecnologías de la información."
    >
      <Hero title="Mentorías" />
      <div className="bg-indigo-100 sm:pt-10 pb-24 mt-16 md:mt-2">
        <div className="container mx-auto min-h-screen bg-white overflow-hidden shadow rounded-lg">
          <div className="px-12 py-5 text-gray-700">
            <iframe
              className="min-h-screen"
              src="https://docs.google.com/forms/d/e/1FAIpQLSclO2ve0vhcVe66YXk6prAAEtWt4zVmvNQ-tTnpNsmoCX_Yfw/viewform?embedded=true"
              width="100%"
            >
              Cargando…
            </iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { dehydratedState } = await getLayout({ preview });

  return {
    props: { preview, dehydratedState },
    revalidate: 1,
  };
};

export default MentorshipsFeedback;
