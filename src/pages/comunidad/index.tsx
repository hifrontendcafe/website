import { useState } from 'react';
import Link from 'next/link';
import { flatten, uniq, intersection, isEmpty } from 'lodash';

import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import { GetStaticProps } from 'next';

import { Profile } from '../../lib/types';
import { getLayout } from '@/utils/get-layout';
import { getProfiles } from '../api/google-sheet';

import Select from 'react-select';

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

  const handleChange = (e) => {
    const selectedTechnologies = e.map((tech) => tech.label);
    setSelected(selectedTechnologies);
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
      <div className="container mx-auto bg-white min-h-screen">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 md:flex md:justify-between">
          <div className="mb-2 font-bold leading-7 md:text-xl text-primary md:mb-0">
            Últimos perfiles registrados
          </div>
          <Link href="https://forms.gle/3ytHZ4NsYj4iukvW9">
            <a target="_blank" className="text-xs btn btn-primary md:text-md">
              Crea tu perfil
            </a>
          </Link>
        </div>
        <Select
          isMulti
          name="technologies"
          options={technologies.map((tech) => ({ value: tech, label: tech }))}
          onChange={handleChange}
          className="w-full md:w-1/2 px-6 pt-5 focus:outline-none focus:ring-green-500"
          classNamePrefix="select"
          placeholder="Filtrar por tecnología ..."
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#00c39d',
              primary25: '#f0fffc',
              primary50: '#9ff5e4',
            },
          })}
        />
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
