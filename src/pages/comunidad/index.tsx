import { GetStaticProps } from 'next';
import { signIn } from 'next-auth/client';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import prisma from '../../lib/prisma';
import { getLayout } from '@/utils/get-layout';
import { Profile } from '@prisma/client';
import { useState } from 'react';
import Select from 'react-select';

type PostsPageProps = {
  profiles: Profile[];
  preview?: boolean;
  technologies: { name: string; id: string }[];
  roles: { name: string; id: string }[];
  seniorities: { name: string; id: string }[];
};

type ProfileFilters = {
  roleId: string;
  location: string;
  seniorityId: string;
  description: string;
  technologies: string[];
};

const ProfilesPage: React.FC<PostsPageProps> = ({
  profiles,
  preview,
  seniorities,
  roles,
  technologies,
}) => {
  const [filters, setFilters] = useState<ProfileFilters>({
    roleId: '',
    location: '',
    seniorityId: '',
    description: '',
    technologies: [],
  });
  const [loading, setLoading] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const filterProfiles = async () => {
    setLoading(true);
    const response = await fetch('/api/profiles/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters }),
    });
    setLoading(false);
    const profiles = await response.json();
    setFilteredProfiles(profiles);
  };
  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 5;

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
        <div className="px-4 py-5 sm:px-6 md:flex md:justify-between">
          <div className="mb-2 font-bold leading-7 md:text-xl text-primary md:mb-0">
            Perfiles registrados
          </div>
          <button
            onClick={() =>
              signIn('discord', {
                callbackUrl: `${window.location.origin}/comunidad/nuevo`,
              })
            }
            className="text-xs btn btn-primary md:text-md"
          >
            Crea tu perfil
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            filterProfiles();
          }}
          className="mx-4 px-2 py-2"
        >
          <div className="md:flex md:items-center justify-around md:space-x-4">
            <div className="mt-3 md:mt-0 w-full">
              <select
                name="role"
                placeholder="Rol"
                className="w-full py-2 border-gray-300 text-sm leading-tight text-gray-700 border rounded"
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
                <option value="" key="all" selected disabled hidden>
                  Rol
                </option>
              </select>
            </div>
            <div className="mt-3 md:mt-0 w-full">
              <select
                name="seniority"
                className="py-2 w-full border-gray-300 text-sm leading-tight text-gray-700 border rounded"
                onChange={(event) =>
                  setFilters({ ...filters, seniorityId: event.target.value })
                }
              >
                {seniorities.map((seniority) => (
                  <option value={seniority.id} key={seniority.id}>
                    {seniority.name}
                  </option>
                ))}
                <option value="" key="all" selected disabled hidden>
                  Seniority
                </option>
                <option value="" key="all">
                  Todas
                </option>
              </select>
            </div>
            <div className="mt-3 md:mt-0 w-full">
              <input
                name="location"
                type="text"
                placeholder="Ubicación"
                className="py-2 w-full border-gray-300 text-sm leading-tight text-gray-700 border rounded"
                onChange={(event) =>
                  setFilters({ ...filters, location: event.target.value })
                }
              />
            </div>
            <div className="mt-3 md:mt-0 w-full">
              <input
                name="seniority"
                type="text"
                placeholder="Explora las biografías"
                className="w-full py-2 border-gray-300 text-sm leading-tight text-gray-700 border rounded"
                onChange={(event) =>
                  setFilters({ ...filters, description: event.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-4 md:flex w-full items-center md:space-x-4">
            <Select
              instanceId="technologies-selector"
              isMulti
              className="text-gray-700 w-full"
              placeholder="Seleccione tecnologías"
              onChange={(techs) =>
                setFilters({ ...filters, technologies: techs })
              }
              isValidNewOption={isValidNewOption}
              options={filters.technologies?.length === 5 ? [] : technologies}
              noOptionsMessage={() => {
                return filters.technologies.length === 5
                  ? 'Has alcanzado el máximo de opciones'
                  : 'No opciones disponibles';
              }}
            />
            <input
              className="w-full md:w-auto mt-4 md:mt-0 text-xs btn btn-primary md:text-md"
              type="submit"
              value="Buscar"
            />
          </div>
        </form>
        <div className="grid grid-cols-1 gap-8 px-6 py-5 text-gray-700 md:grid-cols-2 lg:grid-cols-3 place-content-stretch ">
          {loading ? (
            <div>Cargando...</div>
          ) : (
            filteredProfiles?.map((profile, i) => (
              <div key={profile.name} className="flex">
                <ProfileCard profile={profile} />
              </div>
            ))
          )}
        </div>
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
  const { dehydratedState } = await getLayout({ preview });
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
  return {
    props: {
      profiles,
      preview,
      dehydratedState,
      technologies: formattedTechnologies,
      roles,
      seniorities,
    },
    revalidate: 1,
  };
};

export default ProfilesPage;
