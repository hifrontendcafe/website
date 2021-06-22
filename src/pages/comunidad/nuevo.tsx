import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getLayout } from '@/utils/get-layout';
import { useForm } from 'react-hook-form';
import { ReactGroup } from '@/lib/types';
import { Technology, Profile, Role, Seniority } from '@prisma/client';
import { useState } from 'react';
import prisma from '../../lib/prisma';
import { DiscordUserTooltip } from '@/components/reactivistas/FormHelpers';
import Select from 'react-select';

//   description: string | null
//   location: string | null
//   photo: string | null
//   roleId: string
//   seniorityId: string

type NewProfileProps = {
  preview?: boolean;
  technologies: Technology[];
  roles: Role[];
  seniorities: Seniority[];
};

const NewProfilePage: React.FC<NewProfileProps> = ({
  preview,
  technologies,
  roles,
  seniorities,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    [] as Technology[],
  );
  const [photo, setPhoto] = useState('');

  const handleTechnologies = (techSelected) => {
    setSelectedTechnologies(techSelected);
  };

  const getBase64 = (file) => {
    const reader = new FileReader();
    //TODO: resize file
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    getBase64(file);
  };

  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 5;

  const submitData = async (data: ReactGroup) => {
    debugger;
    try {
      const body = { ...data, technologies: selectedTechnologies };
      await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  return (
    <Layout
      title="Comunidad"
      description="Encontrá los perfiles dentro de FEC"
      preview={preview}
    >
      <div className="container px-4 pt-16 mx-auto sm:px-6 md:pt-0">
        <h1 className="title mt-2 leading-snug tracking-tight py-20 text-center">
          Crea tu propio perfil en nuestro portal
        </h1>
      </div>
      <div className="container mx-auto overflow-hidden rounded-lg shadow bg-gray-50">
        <div className="px-6 border-b border-gray-200 py-5 md:px-8">
          <form
            onSubmit={handleSubmit(submitData)}
            className="flex flex-col w-full grid-cols-2 gap-5 sm:px-8 sm:pt-6 sm:pb-8 rounded bg-gray-50 md:grid"
          >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">
                Nombre y Apellido
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                name="name"
                type="text"
                placeholder="Ingresa nombre y apellido"
                required
                ref={register()}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">
                User de Discord*
              </label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="discord"
                  type="text"
                  placeholder="Ingresa tu usuario de Discord"
                  required
                  pattern="(.*)#(\d{4})"
                  ref={register()}
                />
                <DiscordUserTooltip />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Email*</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  placeholder="Ingresa tu email"
                  required
                  pattern="(.*)#(\d{4})"
                  ref={register()}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Twitter</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="twitter"
                  type="url"
                  placeholder="Url completa de tu perfil"
                  required
                  ref={register({ required: false })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Linkedin</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="linkedin"
                  type="url"
                  placeholder="Url completa de tu perfil"
                  required
                  ref={register({ required: false })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Github</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="github"
                  type="url"
                  placeholder="Url completa de tu perfil"
                  required
                  ref={register({ required: false })}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Portfolio</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="portfolio"
                  type="url"
                  placeholder="Url completa de tu web"
                  required
                  ref={register()}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Ubicación</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="text"
                  type="string"
                  placeholder="Tu ubicación actual"
                  required
                  ref={register()}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Foto</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="photo"
                  type="file"
                  required
                  onChange={handleFile}
                  // ref={register()}
                />
              </div>
              <img src={photo} alt="" className="w-24 h-24" />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">
                Rol actual o con el que te defines
              </label>
              <div className="relative">
                <select
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="roleId"
                  required
                  ref={register()}
                >
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Seniority</label>
              <div className="relative">
                <select
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  name="seniorityId"
                  required
                  ref={register()}
                >
                  {seniorities.map((seniority) => (
                    <option key={seniority.id} value={seniority.id}>
                      {seniority.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">
                Tecnologias
              </label>
              <div className="relative">
                <Select
                  isMulti
                  onChange={handleTechnologies}
                  isValidNewOption={isValidNewOption}
                  options={
                    selectedTechnologies.length === 4 ? [] : technologies
                  }
                  noOptionsMessage={() => {
                    return selectedTechnologies.length === 4
                      ? 'Has alcanzado el máximo de opciones'
                      : 'No opciones disponibles';
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">BIO</label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                name="description"
                placeholder="Cuentanos un poco de tí"
                ref={register()}
              ></textarea>
            </div>
            <div className="mb-4 flex items-center">
              <input
                className="px-3 mr-2 text-sm leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                name="consent"
                type="checkbox"
                required
                ref={register()}
              />
              <label className="block text-sm font-bold">
                Aceptas que tu información sea mostrada en la web de
                FrontendCafé
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                className="px-3 mr-2 text-sm leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                name="available"
                type="checkbox"
                required
                ref={register()}
              />
              <label className="block text-sm font-bold">
                ¿Te encuentras en búsqueda de trabajo activa?
              </label>
            </div>
            <div className="pt-8">
              <div className="flex justify-end">
                <button
                  // type="submit"

                  onClick={handleSubmit(submitData)}
                  className="inline-flex justify-center px-6 py-3 font-medium text-white border border-transparent rounded-md shadow-sm text-md bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar Perfil
                </button>
              </div>
            </div>
          </form>
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
  // console.log({ technologies, roles, seniorities });
  return {
    props: {
      technologies: formattedTechnologies,
      preview,
      dehydratedState,
      roles,
      seniorities,
    },
  };
};

export default NewProfilePage;
