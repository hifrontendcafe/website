import React from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import Layout from '@/components/Layout';
import { findProfiles } from '@/lib/prisma-queries';
import { getSettings } from '@/lib/api';

const ProfilePage = ({ preview, profile }) => {
  const router = useRouter();

  if (!router.isFallback && !profile?.discordId) return <Error statusCode={404} />;

  if (router.isFallback) return <div>Cargando...</div>;

  // TODO: Design, define show data
  return (
    <Layout
      title="Perfil"
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

// TODO: Create functions to get necessary data
export const getStaticProps = async ({ params, preview = false }) => {
  const settings = await getSettings(preview);

  const response = await findProfiles({ active: true });

  const profiles = response.map((profile) => ({
    ...profile,
    createdAt: profile.createdAt.toString(),
    updatedAt: profile.createdAt.toString(),
  }))

  const dataProfile = profiles?.filter((profile) => {
    if (profile.discordId === params.slug) { return true }
  })

  return {
    props: {
      preview,
      profile: dataProfile[0],
      settings,
    },
    revalidate: 1,
  }
}

export const getStaticPaths = async () => {
  const profiles = await findProfiles({ active: true });

  const paths = profiles?.map((profile) => ({
    params: { slug: profile.discordId}
  }));

  return { paths, fallback: true };
};

export default ProfilePage;