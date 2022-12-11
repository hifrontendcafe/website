import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';

import SectionHero from '@/components/SectionHero';
import StaffCard from '@/components/StaffCard';
import { getFecTeam, getPageByName, getSettings } from '../../lib/api';
import { Page, Person } from '../../lib/types';

type PostsPageProps = {
  profiles: Person[];
  preview?: boolean;
  page: Page;
};

const StaffPage: React.FC<PostsPageProps> = ({ profiles, preview, page }) => {
  return (
    <Layout
      title={page.title}
      description={page.shortDescription}
      metadata={page.metadata}
      preview={preview}
    >
      <SectionHero title={page.title} />
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-8 px-6 py-5 text-secondary lg:pt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-stretch">
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
  const page = await getPageByName(preview, 'Equipo');

  return {
    props: { preview, profiles, settings, page },
    revalidate: 60,
  };
};

export default StaffPage;
