import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import prisma from '../../lib/prisma';
import { getLayout } from '@/utils/get-layout';
import { motion } from 'framer-motion';
import { Profile } from '@prisma/client';

type PostsPageProps = {
  profiles: Profile[];
  preview?: boolean;
};

const ProfilesPage: React.FC<PostsPageProps> = ({ profiles, preview }) => {
  const [openToWork, setOpenToWork] = React.useState(false);

  const viewedProfiles = openToWork
    ? profiles.filter((profile) => profile.available)
    : profiles;

  return (
    <Layout
      title="Comunidad"
      description="Encontrá los perfiles dentro de FEC"
      preview={preview}
    >
      <div className="container px-4 pt-16 mx-auto sm:px-6 md:pt-0">
        <h1 className="title mt-2 leading-snug tracking-tight py-20 text-center">
          Conoce nuestra comunidad
        </h1>
      </div>
      <div className="container mx-auto bg-white min-h-screen">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 md:flex md:justify-between">
          <div className="mb-2 font-bold leading-7 md:text-xl text-primary md:mb-0">
            Últimos perfiles registrados
          </div>
          <div className="checkbox-component">
            <label>
              En búsqueda activa:
              <input
                type="checkbox"
                checked={openToWork}
                onChange={() => setOpenToWork(!openToWork)}
              />
            </label>
            <Link href="/comunidad/nuevo">
              <a className="text-xs btn btn-primary md:text-md">
                Crea tu perfil
              </a>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 px-6 py-5 text-gray-700 md:grid-cols-2 lg:grid-cols-3 place-content-stretch ">
          {viewedProfiles?.map((profile, i) => (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              key={profile.name}
              className="flex"
            >
              <ProfileCard profile={profile} />
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { dehydratedState } = await getLayout({ preview });
  const response = await prisma.profile.findMany({
    where: { active: true },
    include: {
      role: {
        select: { name: true },
      },
      technologies: {
        select: { name: true },
      },
      seniority: {
        select: { name: true },
      },
    },
  });
  const profiles = response.map((profile) => ({
    ...profile,
    createdAt: profile.createdAt.toString(),
    updatedAt: profile.createdAt.toString(),
  }));
  return { props: { profiles, preview, dehydratedState } };
};

export default ProfilesPage;
