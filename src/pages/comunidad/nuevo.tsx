import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getLayout } from '@/utils/get-layout';
import { useForm } from 'react-hook-form';
import { ReactGroup } from '@/lib/types';
import { Technology, Role, Seniority } from '@prisma/client';
import { useState } from 'react';
import prisma from '../../lib/prisma';
import { DiscordUserTooltip } from '@/components/reactivistas/FormHelpers';
import Select from 'react-select';
import Resizer from 'react-image-file-resizer';

type NewProfileProps = {
  preview?: boolean;
  technologies: Technology[];
  roles: Role[];
  seniorities: Seniority[];
};

const resizeFile = (newFile: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      newFile,
      150,
      150,
      'WEBP',
      90,
      0,
      (uri) => {
        return resolve(uri);
      },
      'base64',
    );
  });

const NewProfilePage: React.FC<NewProfileProps> = ({
  preview,
  technologies,
  roles,
  seniorities,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    [] as Technology[],
  );
  const [photo, setPhoto] = useState('');

  const handleTechnologies = (techSelected) => {
    setSelectedTechnologies(techSelected);
  };

  const handleFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = await resizeFile(file);
      setPhoto(image as string);
    }
  };

  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 5;

  const onSubmit = async (data: ReactGroup) => {
    try {
      // const body = { ...data, technologies: selectedTechnologies, photo };
      // await fetch('/api/profiles', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(body),
      // });
      alert('Formulario enviado con éxito');
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  const onError = (errors, e) => console.log(errors, e);

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
      <div className="container mx-auto overflow-hidden rounded-lg shadow bg-gray-50 mb-8">
        <div className="px-6 border-b border-gray-200 py-5 md:px-8">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="w-full sm:px-8 sm:pt-6 sm:pb-8 rounded bg-gray-50"
            noValidate
          >
            <div className="flex flex-col grid-cols-2 gap-5 md:grid">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">
                  Nombre y Apellido*
                </label>
                <input
                  className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                    errors.name && 'border-red-400'
                  }`}
                  type="text"
                  placeholder="Ingresa nombre completo"
                  {...register('name', { required: true })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">
                  Usuario de Discord*
                </label>
                <div className="relative z-10">
                  <input
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                      errors.discord && 'border-red-400'
                    }`}
                    type="text"
                    required
                    placeholder="Ingresa tu usuario de Discord"
                    {...register('discord', { required: true })}
                  />
                  <DiscordUserTooltip />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Email*</label>
                <div className="relative">
                  <input
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                      errors.email && 'border-red-400'
                    }`}
                    type="email"
                    required
                    placeholder="Ingresa tu email"
                    {...register('email', { required: true })}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">
                  Lugar de residencia*
                </label>
                <div className="relative">
                  <input
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                      errors.location && 'border-red-400'
                    }`}
                    type="text"
                    required
                    placeholder="Tu ubicación actual"
                    {...register('location', { required: true })}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Twitter</label>
                <div className="relative">
                  <input
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                      errors.twitter && 'border-red-400'
                    }`}
                    type="url"
                    placeholder="URL completa de tu perfil"
                    {...register('twitter')}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Linkedin</label>
                <div className="relative">
                  <input
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                      errors.linkedin && 'border-red-400'
                    }`}
                    type="url"
                    placeholder="URL completa de tu perfil"
                    {...register('linkedin')}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Github</label>
                <div className="relative">
                  <input
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                      errors.github && 'border-red-400'
                    }`}
                    type="url"
                    placeholder="URL completa de tu perfil"
                    {...register('github')}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">
                  Portfolio
                </label>
                <div className="relative">
                  <input
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                      errors.portfolio && 'border-red-400'
                    }`}
                    type="url"
                    placeholder="URL completa de tu web"
                    {...register('portfolio')}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">
                  Rol actual o con el que te defines*
                </label>
                <div className="relative">
                  <select
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline ${
                      errors.roleId && 'border-red-400'
                    }`}
                    {...register('roleId', { required: true })}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">
                  Seniority*
                </label>
                <div className="relative">
                  <select
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                      errors.seniorityId && 'border-red-400'
                    }`}
                    {...register('seniorityId', { required: true })}
                  >
                    {seniorities.map((seniority) => (
                      <option key={seniority.id} value={seniority.id}>
                        {seniority.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">
                Foto de perfil
              </label>
              <div className="flex items-center space-x-4 justify-start w-full">
                <label className="flex overflow-hidden items-center justify-center rounded-md border-4 border-dashed hover:bg-gray-100 hover:border-primary group w-32 h-32 hover:opacity-75 cursor-pointer">
                  {photo ? (
                    <img
                      src={photo}
                      alt=""
                      className="object-cover h-full w-full rounded-md"
                    />
                  ) : (
                    <svg
                      className="w-10 h-10 text-primary group-hover:text-primarydark"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFile}
                  />
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">
                Tecnologías
                <p className="text-gray-400 text-sm font-medium">
                  Selecciona un máximo de 5 tecnologías.
                </p>
              </label>
              <div className="relative">
                <Select
                  instanceId="technologies-selector"
                  isMulti
                  placeholder=""
                  onChange={handleTechnologies}
                  isValidNewOption={isValidNewOption}
                  options={
                    selectedTechnologies.length === 5 ? [] : technologies
                  }
                  noOptionsMessage={() => {
                    return selectedTechnologies.length === 5
                      ? 'Has alcanzado el máximo de opciones'
                      : 'No opciones disponibles';
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">BIO*</label>
              <textarea
                rows={5}
                required
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                  errors.description && 'border-red-400'
                }`}
                {...register('description', { required: true })}
                placeholder="Cuentanos un poco de tí"
              ></textarea>
            </div>
            <div className="mb-4 flex items-center">
              <input
                className="mr-2 text-sm leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                {...register('available')}
                type="checkbox"
              />
              <label className="block text-sm font-bold">
                ¿Te encuentras en búsqueda de trabajo activa?
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                className={`mr-2 text-sm leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline ${
                  errors.consent && 'border-red-400'
                }`}
                type="checkbox"
                required
                {...register('consent', { required: true })}
              />
              <label className="block text-sm font-bold">
                Acepto que mi información sea compartida en la web de
                FrontendCafé*
              </label>
            </div>
            <div className="pt-8">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center px-6 py-3 font-medium text-white border border-transparent rounded-md shadow-sm text-md bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enviar
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
