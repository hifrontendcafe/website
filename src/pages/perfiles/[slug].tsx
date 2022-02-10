import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Custom404 from '@/pages/404';
import Layout from '@/components/Layout';
import { getAllProfiles, getProfile, getSettings } from '@/lib/api';
import { PageProfile } from '@/lib/types';

const ProfilePage: React.FC<PageProfile> = ({ preview, profile }) => {
  const router = useRouter();

  if (!router.isFallback && !profile?.person?.discord) return <Custom404 />;

  return (
    <Layout
      title={`Perfil: ${profile.person.firstName}`}
      description="Compartí tu profile FEC a las redes"
      preview={preview}
    >
      <div className="flex items-center justify-center py-10 mx-auto">
        <div className="flex justify-between w-3/5 px-10 py-4 border-4 rounded-lg border-greenFec">
          <img
            src={profile.person.photo}
            alt={profile.person.firstName}
            className="object-cover object-top w-40 h-40 rounded-full shadow-lg"
          />
          <div className="flex flex-col ml-8 text-greenFec">
            <span>
              <b>Usuario: </b>
              {profile.person.firstName} ({profile.person.discord})
            </span>
            {profile.person.github && (
              <span>
                <b>GitHub: </b>
                {profile.person.github}
              </span>
            )}
            {profile.person.portfolio && (
              <span>
                <b>Portfolio: </b>
                {profile.person.portfolio}
              </span>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const settings = await getSettings(preview);

  const profile = await getProfile(params.slug as string, preview);

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      profile,
      settings,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const profiles = await getAllProfiles();

  const paths = profiles?.map((profile) => ({
    params: { slug: profile.person.discord },
  }));

  return { paths, fallback: 'blocking' };
};

export default ProfilePage;
