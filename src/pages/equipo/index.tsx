import Layout from '../../components/Layout';
import { GetStaticProps } from 'next';

import { getFecTeam, getSettings } from '../../lib/api';
import { Person } from '../../lib/types';
import StaffCard from '@/components/StaffCard';
import SectionHero from '@/components/SectionHero';

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
      <SectionHero title="Nuestro equipo" />
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-8 px-6 py-5 text-coolGray-200 lg:pt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-stretch">
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
