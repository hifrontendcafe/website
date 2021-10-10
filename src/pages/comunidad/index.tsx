import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { signIn } from 'next-auth/client';
import Layout from '@/components/Layout';
import ProfileCard from '@/components/ProfileCard';
import prisma from '@/lib/prisma';
import { getSettings } from '@/lib/api';
import Select from 'react-select';
import { ExtendedProfile, ProfileFilters } from '@/lib/types';
import { findProfiles } from '@/lib/prisma-queries';
import { useSession } from 'next-auth/client';
import Spinner from '@/components/Spinner';
import { shuffle } from '@/lib/shuffle';
import SectionHero from '@/components/SectionHero';

const maxTechnologies = 5;

type PostsPageProps = {
  profiles: ExtendedProfile[];
  preview?: boolean;
  technologies: { name: string; id: string }[];
  roles: { name: string; id: string }[];
  seniorities: { name: string; id: string }[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function post(url: string, body: Record<string, any>) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function searchProfiles(filters: ProfileFilters) {
  return post('/api/profiles/search', { filters });
}

function signInDiscord() {
  return signIn('discord', {
    callbackUrl: `${window.location.origin}/comunidad/nuevo`,
  });
}

const SignupLoadingButton = () => (
  <button
    onClick={signInDiscord}
    className="text-xs btn btn-primary md:text-md"
  >
    <Spinner />
  </button>
);

const SignupRegisteredButton = () => (
  <button
    onClick={signInDiscord}
    className="text-xs btn btn-primary md:text-md"
  >
    Modifica tu perfil
  </button>
);

const SignupUnregisteredButton = () => (
  <button
    onClick={signInDiscord}
    className="text-xs btn btn-primary md:text-md"
  >
    Crea tu perfil
  </button>
);

interface SignupButtonProps {
  loading: boolean;
  hasProfile: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = ({ loading, hasProfile }) => {
  if (loading) {
    return <SignupLoadingButton />;
  }

  if (hasProfile) {
    return <SignupRegisteredButton />;
  }

  return <SignupUnregisteredButton />;
};

const initialProfileState = {
  roleId: '',
  location: '',
  seniorityId: '',
  description: '',
  technologies: [],
  available: false,
};

const ProfilesPage: React.FC<PostsPageProps> = ({
  profiles,
  preview,
  seniorities,
  roles,
  technologies,
}) => {
  const [session, loadingSession] = useSession();

  const hasProfile = profiles.some(
    (profile) => profile.discordId === session?.user?.id,
  );

  const [filters, setFilters] = useState<ProfileFilters>(initialProfileState);

  const [loading, setLoading] = useState<boolean>(false);
  const [filteredProfiles, setFilteredProfiles] =
    useState<ExtendedProfile[]>(profiles);

  const filterProfiles = async () => {
    setLoading(true);
    const response = await searchProfiles(filters);
    setLoading(false);

    const profiles = await response.json();
    setFilteredProfiles(profiles);
  };

  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < maxTechnologies;

  return (
    <Layout
      title="Comunidad"
      description="Encontrá los perfiles dentro de FEC"
      preview={preview}
    >
      <SectionHero
        title="Conoce nuestra comunidad"
        paragraph="Te invitamos a saber más sobre nuestros perfiles, sus iniciativas e
        intereses y poder conectarte a través de sus redes sociales."
      />
      <div className="min-h-screen mx-auto">
        <div className="max-w-5xl mx-auto mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              filterProfiles();
            }}
            className="px-2 py-2 mx-4"
          >
            <div className="justify-around md:flex md:items-center md:space-x-4 text-gray-50">
              <div className="w-full mt-3 md:mt-0">
                <select
                  name="role"
                  placeholder="Rol"
                  className="w-full py-2 text-sm leading-tight bg-transparent border border-gray-300 rounded"
                  onChange={(event) =>
                    setFilters({ ...filters, roleId: event.target.value })
                  }
                >
                  {roles.map((role) => (
                    <option value={role.id} key={role.id}>
                      {role.name}
                    </option>
                  ))}
                  <option value="" key="all">
                    Todos
                  </option>
                  <option value="" key="placeholder" selected disabled hidden>
                    Rol
                  </option>
                </select>
              </div>
              <div className="w-full mt-3 md:mt-0">
                <select
                  name="seniority"
                  className="w-full py-2 text-sm leading-tight bg-transparent border border-gray-300 rounded "
                  onChange={(event) =>
                    setFilters({ ...filters, seniorityId: event.target.value })
                  }
                >
                  {seniorities.map((seniority) => (
                    <option value={seniority.id} key={seniority.id}>
                      {seniority.name}
                    </option>
                  ))}
                  <option value="" key="placeholder" selected disabled hidden>
                    Seniority
                  </option>
                  <option value="" key="all">
                    Todas
                  </option>
                </select>
              </div>
              <div className="w-full mt-3 md:mt-0">
                <input
                  name="location"
                  type="text"
                  placeholder="Ubicación"
                  className="w-full py-2 text-sm leading-tight bg-transparent border border-gray-300 rounded placeholder-gray-50"
                  onChange={(event) =>
                    setFilters({ ...filters, location: event.target.value })
                  }
                />
              </div>
              <div className="w-full mt-3 md:mt-0">
                <input
                  name="seniority"
                  type="text"
                  placeholder="Explora las biografías"
                  className="w-full py-2 text-sm leading-tight bg-transparent border border-gray-300 rounded placeholder-gray-50"
                  onChange={(event) =>
                    setFilters({ ...filters, description: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="items-center w-full mt-4 md:flex md:space-x-4">
              <Select
                instanceId="technologies-selector"
                isMulti
                classNamePrefix="react-select"
                className="w-full filter-selector bg"
                placeholder="Selecciona tecnologías"
                onChange={(techs) =>
                  setFilters({ ...filters, technologies: [...techs] })
                }
                isValidNewOption={isValidNewOption}
                options={
                  filters.technologies?.length === maxTechnologies
                    ? []
                    : technologies
                }
                noOptionsMessage={() => {
                  return filters.technologies.length === maxTechnologies
                    ? 'Has alcanzado el máximo de opciones'
                    : 'No opciones disponibles';
                }}
              />
              <div className="flex items-center flex-shrink-0 mt-4 space-x-2 md:mt-0">
                <label
                  htmlFor="toggle"
                  className="flex-shrink w-24 text-sm leading-4 text-gray-50"
                >
                  En búsqueda activa
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                  <input
                    checked={filters.available}
                    name="toggle"
                    type="checkbox"
                    onChange={(event) =>
                      setFilters({
                        ...filters,
                        available: event.target.checked,
                      })
                    }
                    className={`absolute transform transition-transform border-gray focus:ring-offset-0 ring-0 outline-none focus:ring-0 focus:outline-none block w-6 h-6 rounded-full border-4 cursor-pointer ${
                      filters.available
                        ? ' translate-x-4 text-green-400'
                        : 'border-gray-500'
                    }`}
                  />
                  <label
                    htmlFor="toggle"
                    className={`${
                      filters.available ? 'bg-white-400' : 'bg-gray-300'
                    } block overflow-hidden border bg-gray-300 border-gray-500 h-6 rounded-full cursor-pointer`}
                  ></label>
                </div>
              </div>
              <input
                className="w-full mt-4 text-xs bg-gray-400 md:w-auto md:mt-0 btn md:text-md"
                type="submit"
                value="Buscar"
              />
            </div>
          </form>
        </div>
        <div className="px-4 py-5 sm:px-6 md:flex md:justify-between">
          <SignupButton loading={loadingSession} hasProfile={hasProfile} />
        </div>
        {loading ? (
          <div className="w-full mt-4 text-center">Cargando...</div>
        ) : filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 py-5 text-gray-300 lg:px-6 md:grid-cols-2 lg:grid-cols-3 place-content-stretch">
            {filteredProfiles.map((profile) => (
              <div key={profile.name} className="flex">
                <ProfileCard profile={profile} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full mt-4 text-center">
            No se han encontrado perfiles con los filtros aplicados.
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const sortResponse = (array) => {
    return [
      ...array.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }),
    ];
  };

  const settings = await getSettings(preview);

  const rolesRepose = await prisma.role.findMany();
  const roles = sortResponse(rolesRepose);
  const technologiesResponse = await prisma.technology.findMany();
  const technologies = sortResponse(technologiesResponse);

  const formattedTechnologies = technologies.map((technology) => ({
    ...technology,
    label: technology.name,
    value: technology.id,
  }));

  const senioritiesResponse = await prisma.seniority.findMany();
  const seniorities = sortResponse(senioritiesResponse);

  const response = await findProfiles({ active: true });

  const profiles = response.map((profile) => ({
    ...profile,
    createdAt: profile.createdAt.toString(),
    updatedAt: profile.createdAt.toString(),
  }));

  // randomizes profiles in place
  shuffle(profiles);

  return {
    props: {
      profiles,
      preview,
      settings,
      technologies: formattedTechnologies,
      roles,
      seniorities,
    },
    revalidate: 1,
  };
};

export default ProfilesPage;
