import CMYKItemCard from '../../components/CMYKItemCard';
import { GetStaticProps } from 'next';
import { getAllCMYKProjects } from '../../lib/api';
import { CMYK } from '../../lib/types';
import Layout from '../../components/Layout';

import { cmykQuery } from '../../lib/queries';
import { usePreviewSubscription } from '../../lib/sanity';
import { getLayout } from '@/utils/get-layout';

type CMYKProjectsProps = {
  preview?: boolean;
  data: CMYK[];
};

const CMYKProjects: React.FC<CMYKProjectsProps> = ({
  preview = false,
  data,
}) => {
  const { data: projects } = usePreviewSubscription(cmykQuery, {
    initialData: data,
    enabled: preview,
  });
  return (
    <Layout title="Proyectos CMYK" preview={preview}>
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="title mt-2 leading-snug tracking-tight">
              Proyectos hechos con{' '}
              <img
                src="/icons/hearth.svg"
                width="50px"
                className="inline"
                alt="heart"
              />
              <br /> por la comunidad
            </h2>
            <p className="mt-4 max-w-3xl text-lg lg:mx-auto">
              Aquí conocerás los diferentes proyectos que los equipos, crearon y
              trabajaron dentro la comunidad. Más que orgullosos por esas largas
              horas de trabajo.
            </p>
          </div>
        </div>
        <img
          src="/img/CMYK-bg.svg"
          alt="background"
          className="mt-5 w-full absolute"
        />
        <div
          className="w-full h-full mt-24"
          style={{ backgroundColor: '#F5F9FF' }}
        >
          <div className="max-w-6xl mx-auto p-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 justify-items-center gap-6 md:gap-2 relative z-10 mt-20">
            {projects.map((project, index) => (
              <CMYKItemCard key={project._id} project={project} index={index} />
            ))}
          </div>
          <div className="text-center py-20">
            <h2 className="subtitle mb-8 tracking-tight">
              El siguiente puede ser el tuyo{' '}
              <img
                src="/icons/hearth.svg"
                className="inline"
                alt="heart"
                width="30px"
              />
            </h2>
            <a
              href="https://discord.gg/frontendcafe"
              className="btn mt-1 btn-secondary py-3 px-6"
            >
              Súmate a Discord
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllCMYKProjects(preview);
  const { dehydratedState } = await getLayout({ preview });

  return { props: { preview, data, dehydratedState }, revalidate: 1 };
};

export default CMYKProjects;
