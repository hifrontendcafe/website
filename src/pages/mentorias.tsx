import Layout from '../components/Layout';
import { GetStaticProps } from 'next';
import { Mentor, Topic } from '../lib/types';
import { getAllMentors, getMentoringTopics } from '../lib/api';
import MentorList from '../components/MentorList';

interface MentorContainerProps {
  mentors: Mentor[];
  topics: Topic[];
}

const MentorshipsPage: React.FC<MentorContainerProps> = ({ topics, mentors }) => {
  return (
    <Layout>
      <section id="events" className="text-gray-700 body-font relative">
        <div className="container px-5 py-16 mx-auto">
          <h1 className="text-3xl pb-6 text-green-500">Mentores</h1>
          <MentorList topics={topics} mentors={mentors} />
        </div>
      </section>
    </Layout>
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
