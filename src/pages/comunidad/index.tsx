import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';

import { Profile } from '../../lib/types';
import { getLayout } from '@/utils/get-layout';
import { getProfiles } from '../api/google-sheet';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type PostsPageProps = {
  profiles: Profile[];
  preview?: boolean;
};

const ProfilesPage: React.FC<PostsPageProps> = ({ profiles, preview }) => {
  const router = useRouter();
  const [filter, setFilter] = useState(null);

  // Non repeated available technologies.
  const technologies = Array.from(
    new Set(profiles.map((profile) => profile.technologies).flat()),
  );

  const clearFilter = useCallback(() => router.push('/comunidad'), []);

  useEffect(() => {
    if (router.query.tech) {
      const paramExist = technologies.includes(
        String(router.query.tech).toLowerCase(),
      );

      if (paramExist) {
        setFilter(router.query.tech);
      } else {
        clearFilter();
      }
    } else {
      setFilter(null);
    }
  }, [clearFilter, router, technologies]);

  const filterExist = (profile: Profile) =>
    filter ? profile.technologies.includes(filter.toLowerCase()) : true;

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
            {filter ? (
              <span className="flex gap-2 items-center">
                {filter.toUpperCase()}
                <button
                  type="button"
                  onClick={() => clearFilter()}
                  className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center bg-primary text-white hover:bg-primary focus:outline-none focus:bg-green-700 focus:text-white"
                >
                  <svg
                    className="h-2 w-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 8 8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M1 1l6 6m0-6L1 7"
                    />
                  </svg>
                </button>
              </span>
            ) : (
              'Últimos perfiles registrados'
            )}
          </div>
          <Link href="https://forms.gle/3ytHZ4NsYj4iukvW9">
            <a className="text-xs btn btn-primary md:text-md">Crea tu perfil</a>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 px-6 py-5 text-gray-700 md:grid-cols-2 lg:grid-cols-3 place-content-stretch ">
          {profiles?.filter(filterExist).map((profile, i) => (
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
  const profiles = await getProfiles();

  const { dehydratedState } = await getLayout({ preview });
  return {
    props: {
      profiles,
      preview,
      dehydratedState,
    },
    revalidate: 1, // In seconds
  };
};

export default ProfilesPage;
