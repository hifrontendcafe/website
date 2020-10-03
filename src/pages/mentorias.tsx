import Layout from '../components/Layout';
import MentorContainer from '../components/MentorContainer';

interface MentorContainerProps {
  title: string;
}

const MentorshipsPage: React.FC<MentorContainerProps> = ({ title }) => {
  return (
    <Layout>
      <section id="events" className="text-gray-700 body-font relative pb-64">
        <div className="container px-5 py-16 mx-auto">
          <h1 className="text-3xl pb-12 text-green-500">Mentores</h1>
          <MentorContainer title={title} />
          <h1 className="text-3xl pb-12 text-green-500">
            Normas de convivencia
          </h1>
        </div>
      </section>
    </Layout>
  );
};

export default MentorshipsPage;
