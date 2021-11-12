import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Custom404 from '@/pages/404'
import Layout from '@/components/Layout';
import { findProfilesBasic } from '@/lib/prisma-queries';
import { getSettings } from '@/lib/api';
import { PageProfile } from '@/lib/types';


const ProfilePage:React.FC<PageProfile> = ({ preview, profile }) => {
  const router = useRouter();

  if (!router.isFallback && !profile?.discordId) return <Custom404 />

  return (
    <Layout
      title={`Perfil: ${profile.name}`}
      description="Compartí tu profile FEC a las redes"
      preview={preview}
    >
      <div className="mx-auto py-10 flex justify-center items-center">
        <div className="flex justify-between w-3/5 border-4 border-greenFec rounded-lg py-4 px-10">
          <img 
            src={profile.photo}
            alt={profile.name}
            className="object-cover object-top w-40 h-40 rounded-full shadow-lg"
          />
          <div className="text-greenFec flex flex-col ml-8">
            <span>
              <b>Usuario: </b>{profile.name} ({profile.discord})
            </span>
            {
              !!profile.github ?
              <span>
                <b>GitHub: </b>{profile.github}
              </span> : ''
            }
            {
              !!profile.portfolio ?
              <span>
                <b>Portfolio: </b>{profile.portfolio}
              </span> : ''
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const settings = await getSettings(preview);

  const response = await findProfilesBasic({ active: true });

  const profiles = response.map((profile) => ({
    ...profile,
    createdAt: profile.createdAt.toString(),
    updatedAt: profile.createdAt.toString(),
  }))

  const dataProfile = profiles?.filter((profile) => {
    if (profile.discordId === params.slug) { return true }
  })

  if (!dataProfile[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      preview,
      profile: dataProfile[0],
      settings,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const profiles = await findProfilesBasic({ active: true });

  const paths = profiles?.map((profile) => ({
    params: { slug: profile.discordId }
  }));

  return { paths, fallback: 'blocking' };
};

export default ProfilePage;