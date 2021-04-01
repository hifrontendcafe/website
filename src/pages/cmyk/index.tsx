import { InferGetStaticPropsType } from 'next';

import Layout from '../../components/Layout';
import CMYKCarousel from '../../components/CMYKCarousel';

import { getAllCMYKProjects } from '../../lib/api';
import { cmykQuery } from '../../lib/queries';
import { usePreviewSubscription } from '../../lib/sanity';

const CMYK: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
  preview,
}) => {
  const { data: projects } = usePreviewSubscription(cmykQuery, {
    initialData: data,
    enabled: preview,
  });
  return (
    <Layout
      title="Proyectos CMYK"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
      mode="simple"
      preview={preview}
    >
      <CMYKCarousel projects={projects} />
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const data = await getAllCMYKProjects(preview);

  return {
    props: {
      data,
      preview,
    },
    revalidate: 1,
  };
}

export default CMYK;
