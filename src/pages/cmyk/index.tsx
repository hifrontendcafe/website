import { InferGetStaticPropsType } from 'next';
import CMYKItemCard from '../../components/CMYKItemCard';

import Layout from '../../components/Layout';

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
      mode="main"
      preview={preview}
    >
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mt-2 text-4xl sm:text-5xl leading-snug font-extrabold tracking-tight text-gray-900">
              Proyectos hechos con{' '}
              <img src="/img/Heart.svg" className="inline" alt="heart" />
              <br /> por la comunidad
            </h2>
            <p className="mt-4 max-w-3xl text-lg lg:mx-auto">
              Aquí conocerás los diferentes proyectos que los equipos, crearon y
              trabajaron dentro la comunidad. Más que orgullosos por esas largas
              horas de trabajo.
            </p>
          </div>
        </div>
        {/* <img src="/img/CMYK-bg.svg" alt="background" className="mt-10 w-full" /> */}
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 justify-items-center"
          style={{ backgroundImage: '/img/CMYK-bg.svg' }}
        >
          {projects.map((project, index) => (
            <CMYKItemCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
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
