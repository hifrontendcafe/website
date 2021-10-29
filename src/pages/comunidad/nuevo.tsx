import { GetStaticProps } from 'next';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/client';
import Layout from '../../components/Layout';
import { getSettings } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { ReactGroup } from '@/lib/types';
import { Technology, Role, Seniority } from '@prisma/client';
import React, { useState, useEffect } from 'react';
import prisma from '../../lib/prisma';
import Select from 'react-select';
import Resizer from 'react-image-file-resizer';
import SectionHero from '@/components/SectionHero';

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
      60,
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
  const [session, loading] = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    [] as Technology[],
  );
  const [photo, setPhoto] = useState('');
  const [userId, setUserId] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [message, setMessage] = useState({ error: false, text: '' });
  const [loadingForm, setLoadingForm] = useState(false);

  const handleTechnologies = (techSelected) => {
    setSelectedTechnologies(techSelected);
  };

  useEffect(() => {
    const fetchUser = async (uId) => {
      setLoadingProfile(true);
      const response = await fetch(`/api/profiles/${uId}`);
      const user = await response.json();
      if (!user.error) {
        setSelectedTechnologies(user.technologies);
        setPhoto(user.photo);
        setUserId(user.id);
        setValue('email', user.email);
        setValue('name', user.name);
        setValue('location', user.location);
        setValue('twitter', user.twitter);
        setValue('linkedin', user.linkedin);
        setValue('github', user.github);
        setValue('portfolio', user.portfolio);
        setValue('roleId', user.roleId);
        setValue('seniorityId', user.seniorityId);
        setValue('description', user.description);
        setValue('available', user.available);
      }
      setLoadingProfile(false);
    };
    if (session && !loading) {
      fetchUser(session.user.id);
    }
  }, [session, setValue, loading]);

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
    setLoadingForm(true);
    try {
      const body = {
        ...data,
        technologies: selectedTechnologies,
        photo,
        discordId: session.user.id,
        id: userId,
      };
      await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setMessage({
        error: false,
        text: `${
          !userId
            ? 'Tu perfil ha sido creado con éxito. Será publicado en nuestro portal en los próximos días.'
            : 'Tu perfil ha sido actualizado con éxito.'
        }`,
      });
    } catch (error) {
      setMessage({
        error: true,
        text: 'Tu perfil no ha podido ser guardado, por favor vuelva a intentarlo nuevamente',
      });
    }
    setLoadingForm(false);

    setTimeout(() => setMessage({ error: false, text: '' }), 5000);
  };

  const onError = (errorsLog, e) => console.log(errorsLog, e);

  if (loading && loadingProfile) {
    return (
      <Layout
        title="Comunidad"
        description="Encontrá los perfiles dentro de FEC"
        preview={preview}
      >
        <div className="py-32 my-20 text-2xl text-center text-gray-100 rounded-lg shadow bg-coolGray-800">
          Cargando Sesión...
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Comunidad"
      description="Encontrá los perfiles dentro de FEC"
      preview={preview}
    >
      <SectionHero
        title="Tu perfil"
        paragraph="Buscamos darle visibilidad quienes participan dentro del servidor, principalmente a quienes se encuentren en búsqueda de su primera experiencia. 
        Si creas tu perfil aparecerás en la sección Comunidad donde recruiters y empresas puedan referirse a la hora de buscar talento."
      />

      <div className="overflow-hidden border-2 rounded-lg shadow border-coolGray-600 bg-coolGray-900">
        {message.text && (
          <div
            className={`text-center text-coolGray-50 rounded p-4 m-4 ${
              message.error ? 'bg-red-600' : 'bg-green-700'
            }`}
          >
            {message.text}
          </div>
        )}
        {session ? (
          <div>
            {loadingForm ? (
              <div className="p-4 text-coolGray-100">
                Enviando Formulario...
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="w-full rounded sm:px-8 sm:pt-6 sm:pb-8 bg-coolGray-900"
                noValidate
              >
                <div className="flex flex-col grid-cols-2 gap-5 md:grid">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Usuario de Discord*
                    </label>
                    <div className="relative z-10">
                      <input
                        className={`input ${
                          errors.discord && 'border-red-400'
                        }`}
                        type="text"
                        required
                        placeholder="Ingresa tu usuario de Discord"
                        value={session.user.name}
                        readOnly
                        {...register('discord', { required: true })}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Email*
                    </label>
                    <div className="relative">
                      <input
                        className={`input ${errors.email && 'border-red-400'}`}
                        type="email"
                        required
                        placeholder="Ingresa tu email"
                        value={session.user.email}
                        readOnly
                        {...register('email', { required: true })}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Nombre y Apellido*
                    </label>
                    <input
                      className={`input ${errors.name && 'border-red-400'}`}
                      type="text"
                      placeholder="Ingresa nombre completo"
                      {...register('name', { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Lugar de residencia*
                    </label>
                    <div className="relative">
                      <input
                        className={`input focus:outline-none focus:shadow-outline ${
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
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Twitter
                    </label>
                    <p className="my-2 text-xs text-coolGray-300">
                      Incluye enlace completo de tu perfil.
                    </p>
                    <div className="relative">
                      <input
                        className={`input ${
                          errors.twitter && 'border-red-400'
                        }`}
                        type="url"
                        placeholder="https://twitter.com/usuario"
                        {...register('twitter')}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Linkedin
                    </label>
                    <p className="my-2 text-xs text-coolGray-300">
                      Incluye enlace completo de tu perfil.
                    </p>
                    <div className="relative">
                      <input
                        className={`input ${
                          errors.linkedin && 'border-red-400'
                        }`}
                        type="url"
                        placeholder="https://linkedin.com/in/usuario"
                        {...register('linkedin')}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Github
                    </label>
                    <p className="my-2 text-xs text-coolGray-300">
                      Incluye enlace completo de tu perfil.
                    </p>
                    <div className="relative">
                      <input
                        className={`input ${errors.github && 'border-red-400'}`}
                        type="url"
                        placeholder="https://github.com/usuario"
                        {...register('github')}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Portfolio
                    </label>
                    <p className="my-2 text-xs text-coolGray-300">
                      Incluye enlace completo de tu web personal.
                    </p>
                    <div className="relative">
                      <input
                        className={`input ${
                          errors.portfolio && 'border-red-400'
                        }`}
                        type="url"
                        placeholder="https://www.portfolio.com"
                        {...register('portfolio')}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Rol actual o con el que te defines*
                    </label>
                    <div className="relative">
                      <select
                        className={`input ${errors.roleId && 'border-red-400'}`}
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
                    <label className="block mb-2 text-sm font-bold text-coolGray-200">
                      Seniority*
                    </label>
                    <div className="relative">
                      <select
                        className={`input ${
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
                  <label className="block mb-2 text-sm font-bold text-coolGray-200">
                    Foto de perfil
                  </label>
                  <div className="flex items-center justify-start w-full space-x-4">
                    <label className="flex items-center justify-center w-32 h-32 overflow-hidden border-4 border-dashed rounded-md cursor-pointer hover:bg-coolGray-100 hover:border-primary group hover:opacity-75">
                      {photo ? (
                        <img
                          src={photo}
                          alt=""
                          className="object-cover w-full h-full rounded-md"
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
                  <label className="block mb-2 text-sm font-bold text-coolGray-200">
                    Tecnologías
                    <p className="text-sm font-medium text-coolGray-400">
                      Selecciona un máximo de 5 tecnologías.
                    </p>
                  </label>
                  <div className="relative">
                    <Select
                      classNamePrefix="react-select"
                      className="w-full bg-transparent form-user"
                      instanceId="technologies-selector"
                      isMulti
                      placeholder=""
                      value={selectedTechnologies}
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
                  <label className="block mb-2 text-sm font-bold text-coolGray-200">
                    BIO*
                  </label>
                  <textarea
                    rows={5}
                    required
                    className={`input ${
                      errors.description && 'border-red-400'
                    }`}
                    {...register('description', { required: true })}
                    placeholder="Cuentanos un poco de tí"
                  ></textarea>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    className="mr-2 text-sm leading-tight border rounded text-coolGray-200 focus:outline-none focus:shadow-outline"
                    {...register('available')}
                    type="checkbox"
                  />
                  <label className="block text-sm font-bold text-coolGray-200">
                    ¿Te encuentras en búsqueda de trabajo activa?
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    className={`mr-2 text-sm leading-tight text-coolGray-200 border rounded focus:outline-none focus:shadow-outline ${
                      errors.consent && 'border-red-400'
                    }`}
                    type="checkbox"
                    required
                    {...register('consent', { required: true })}
                  />
                  <label className="block text-sm font-bold text-coolGray-200">
                    ¿Aceptas que tu información sea compartida en la web de
                    FrontendCafé?*
                  </label>
                </div>
                <div className="pt-8">
                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="p-4 text-coolGray-100">
            Para poder registrar tu perfil es necesario que inicies sesión con
            Discord. <br />
            <br />
            <Link href="/comunidad/nuevo">
              <button
                onClick={() =>
                  signIn('discord', {
                    callbackUrl: `${window.location.origin}/comunidad/nuevo`,
                  })
                }
                className="text-xs btn btn-primary md:text-md"
              >
                Iniciar Sesión
              </button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings(preview);

  const roles = await prisma.role.findMany();
  const technologies = await prisma.technology.findMany();
  const formattedTechnologies = technologies.map((technology) => ({
    ...technology,
    label: technology.name,
    value: technology.id,
  }));

  const seniorities = await prisma.seniority.findMany();

  return {
    props: {
      technologies: formattedTechnologies,
      preview,
      settings,
      roles,
      seniorities,
    },
  };
};

export default NewProfilePage;
