import Layout from '../components/Layout';
import { GetStaticProps } from 'next';
import { Mentor } from '../lib/types';
import { getAllMentors } from '../lib/api';
import MentorList from '../components/MentorList';

interface MentorContainerProps {
  mentors: Mentor[];
}

const MentorshipsPage: React.FC<MentorContainerProps> = ({ mentors, title }) => {
  return (
    <Layout>
      <section id="events" className="text-gray-700 body-font relative pb-64">
        <div className="container px-5 py-16 mx-auto">
          <h1 className="text-3xl pb-12 text-green-500">Mentores</h1>
          <MentorList mentors={mentors} />
          <h1 className="mt-12 text-3xl pb-12 text-green-500">
            Normas de convivencia
          </h1>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const mentors = await getAllMentors(preview);
  return {
    props: { mentors },
    revalidate: 1,
  };
};

export default MentorshipsPage;
