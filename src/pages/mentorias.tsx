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
      <section id="events" className="text-gray-700 body-font relative pb-64">
        <div className="container px-5 py-16 mx-auto">
          <h1 className="text-3xl pb-6 text-green-500">Mentores</h1>
          <div className="inline-block relative w-64 mb-6">
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option>--</option>
              {topics.map((topic, index) => <option key={index}>{topic.title}</option>)  }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <MentorList topics={topics} mentors={mentors} />
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
  const topics = await getMentoringTopics(preview);
  return {
    props: { mentors, topics },
    revalidate: 1,
  };
};

export default MentorshipsPage;
