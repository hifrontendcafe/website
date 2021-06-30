import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import prisma from '../../lib/prisma';
import { getLayout } from '@/utils/get-layout';
import { motion } from 'framer-motion';
import { Profile, Technology } from '@prisma/client';
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
          <Link href="/comunidad/nuevo">
            <a className="text-xs btn btn-primary md:text-md">Crea tu perfil</a>
          </Link>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            filterProfiles();
          }}
          className="mx-4 px-4 py-2 bg-gray-100 rounded shadow"
        >
          <div className="flex items-center space-x-4">
            <div>
              <label
                className="block text-xs font-semibold text-gray-600"
                htmlFor="seniority"
              >
                SENIORITY
              </label>
              <select
                name="seniority"
                className="py-2 text-sm leading-tight text-gray-700 border rounded"
                onChange={(event) =>
                  setFilters({ ...filters, seniorityId: event.target.value })
                }
              >
                {seniorities.map((seniority) => (
                  <option value={seniority.id} key={seniority.id}>
                    {seniority.name}
                  </option>
                ))}
                <option value={''} key="all" selected>
                  Todas
                </option>
              </select>
            </div>
            <div>
              <label
                className="block text-xs font-semibold text-gray-600"
                htmlFor="seniority"
              >
                LOCALIZACIÓN
              </label>
              <input
                name="seniority"
                type="text"
                placeholder="Busca por ubicación"
                className="py-2 text-sm leading-tight text-gray-700 border rounded"
                onChange={(event) =>
                  setFilters({ ...filters, location: event.target.value })
                }
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold text-gray-600"
                htmlFor="seniority"
              >
                BIO
              </label>
              <input
                name="seniority"
                type="text"
                placeholder="Busca palabras claves"
                className="py-2 text-sm leading-tight text-gray-700 border rounded"
                onChange={(event) =>
                  setFilters({ ...filters, description: event.target.value })
                }
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold text-gray-600"
                htmlFor="role"
              >
                ROL
              </label>
              <select
                name="role"
                className="w-auto py-2 text-sm leading-tight text-gray-700 border rounded"
                onChange={(event) =>
                  setFilters({ ...filters, roleId: event.target.value })
                }
              >
                {roles.map((role) => (
                  <option value={role.id} key={role.id}>
                    {role.name}
                  </option>
                ))}
                <option value="" key="all" selected>
                  Todos
                </option>
              </select>
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-xs font-semibold text-gray-600">
              TECNOLOGÍAS (5 máximo)
            </label>
            <div>
              <Select
                instanceId="technologies-selector"
                isMulti
                className="text-gray-700"
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
            </div>
          </div>
          <input
            className="text-xs btn btn-primary md:text-md mt-2"
            type="submit"
            value="Buscar"
          />
        </form>
        <div className="grid grid-cols-1 gap-8 px-6 py-5 text-gray-700 md:grid-cols-2 lg:grid-cols-3 place-content-stretch ">
          {loading ? (
            <div>Cargando...</div>
          ) : (
            filteredProfiles?.map((profile, i) => (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                key={profile.name}
                className="flex"
              >
                <ProfileCard profile={profile} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { dehydratedState } = await getLayout({ preview });
  const roles = await prisma.role.findMany();
  const technologies = await prisma.technology.findMany();
  const formattedTechnologies = technologies.map((technology) => ({
    ...technology,
    label: technology.name,
    value: technology.id,
  }));
  const seniorities = await prisma.seniority.findMany();
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
  };
};

export default ProfilesPage;
