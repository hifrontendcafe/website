import Link from 'next/link';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';

import { getAllProfiles } from '../../lib/api';
import { Profile } from '../../lib/types';

type PostsPageProps = {
  profiles: Profile[];
};

const ProfilesPage: React.FC<PostsPageProps> = ({ profiles }) => {
  return (
    <Layout title="Perfiles" description="Encontrá los perfiles dentro de FEC">
      <div className="container px-4 sm:px-6 mx-auto pt-16 md:pt-0">
        <h1 className="text-2xl md:text-4xl pt-4 mt-0 md:my-4 font-semibold">
          Conoce a la comunidad
        </h1>
      </div>
      <div className=" container mx-auto bg-white">
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6 md:flex md:justify-between">
          <div className="md:text-xl font-bold leading-7 text-primary mb-2 md:mb-0">
            Últimos perfiles registrados
          </div>
          <Link href="/docs/crea-tu-perfil">
            <a className="btn btn-primary text-xs md:text-md">Crea tu perfil</a>
          </Link>
        </div>
        <div className="px-6 py-5 text-gray-700 grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles?.map((profile) => (
            <ProfileCard profile={profile} key={profile.slug} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const profiles = await getAllProfiles([
    'name',
    'socialMedia',
    'slug',
    'role',
    'content',
    'ogImage',
    'coverImage',
    'email',
    'availableForWork',
    'stack',
  ]);
  return {
    props: { profiles },
  };
}

export default ProfilesPage;
