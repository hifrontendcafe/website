import Layout from '../../components/Layout';
import { GetStaticProps } from 'next';

import { getFecTeam, getSettings } from '../../lib/api';
import { Person } from '../../lib/types';
import StaffCard from '@/components/StaffCard';

type PostsPageProps = {
  profiles: Person[];
  preview?: boolean;
};

const StaffPage: React.FC<PostsPageProps> = ({ profiles, preview }) => {
  return (
    <Layout
      title="Nuestro equipo"
      description="Conoce al equipo de FEC"
      preview={preview}
    >
      <div className="container px-4 pt-16 mx-auto sm:px-6 md:pt-0">
        <h1 className="p-8 mt-2 leading-snug tracking-tight text-center md:py-20 title">
          Conoce nuestro equipo
        </h1>
      </div>
      <div className="container mx-auto mb-20">
        <div className="grid grid-cols-1 gap-8 px-6 py-5 text-gray-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-stretch">
          {profiles?.map((profile) => (
            <StaffCard profile={profile} key={profile._id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const profiles = await getFecTeam(preview);
  const settings = await getSettings(preview);

  return {
    props: { preview, profiles, settings },
    revalidate: 1,
  };
};

export default StaffPage;
