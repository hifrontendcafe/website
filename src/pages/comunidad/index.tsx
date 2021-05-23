import Link from 'next/link';
import { flatten, uniq, intersection, isEmpty } from 'lodash';

import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import { GetStaticProps } from 'next';

import { Profile } from '../../lib/types';
import { getLayout } from '@/utils/get-layout';
import { getProfiles } from '../api/google-sheet';
import { useState } from 'react';

type PostsPageProps = {
  profiles: Profile[];
  preview?: boolean;
};

const ProfilesPage: React.FC<PostsPageProps> = ({ profiles, preview }) => {
  const [selected, setSelected] = useState([]);

  const technologies = uniq(
    flatten(
      profiles.map((profile) => profile.technologies.map((x) => x.trim())),
    ),
  );

  const handleSelection = (tech) => {
    setSelected((prev) =>
      selected.includes(tech)
        ? [...prev.filter((e) => e !== tech)]
        : [...prev, tech],
    );
  };

  return (
    <Layout
      title="Comunidad"
      description="Encontrá los perfiles dentro de FEC"
      preview={preview}
    >
      <div className="container px-4 pt-16 mx-auto sm:px-6 md:pt-0">
        <h1 className="title mt-2 leading-snug tracking-tight py-10 md:py-20 text-center">
          Conoce nuestra comunidad
        </h1>
      </div>
      <div className="container mx-auto bg-white ">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 md:flex md:justify-between">
          <div className="mb-2 font-bold leading-7 md:text-xl text-primary md:mb-0">
            Últimos perfiles registrados
          </div>
          <Link href="https://forms.gle/3ytHZ4NsYj4iukvW9">
            <a className="text-xs btn btn-primary md:text-md">Crea tu perfil</a>
          </Link>
        </div>
        <div className="w-full flex flex-wrap mt-5 px-6 gap-2">
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              className={`uppercase inline-flex items-center px-3 py-1  border-2 border-green-400 shadow-sm text-xs font-medium rounded  focus:outline-none focus:ring-green-500 ${
                selected.includes(tech)
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => handleSelection(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 px-6 py-5 text-gray-700 md:grid-cols-2 lg:grid-cols-3 place-content-stretch">
          {profiles
            ?.filter((x) =>
              selected.length > 0
                ? !isEmpty(
                    intersection(
                      selected,
                      x.technologies.map((t) => t.trim()),
                    ),
                  )
                : true,
            )
            .map((profile) => (
              <ProfileCard profile={profile} key={profile.name} />
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
