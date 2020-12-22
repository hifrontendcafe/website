import { InferGetStaticPropsType } from 'next';

import Layout from '../../components/Layout';
import CMYKCarousel from '../../components/CMYKCarousel';

import { getAllCMYKProjects } from '../../lib/api';

const CMYK: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projects,
}) => {
  return (
    <Layout
      title="Proyectos CMYK"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
      mode="simple"
    >
      <CMYKCarousel projects={projects} />
    </Layout>
  );
};

export async function getStaticProps() {
  const projects = await getAllCMYKProjects();

  return {
    props: {
      projects,
    },
  };
}

export default CMYK;
