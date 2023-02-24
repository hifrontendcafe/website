'use client';

import type { Role, Seniority, Technology } from '@/lib/types';
import { Profile, ReactGroup } from '@/lib/types';
import emailjs from '@emailjs/browser';
import { signIn, useSession } from 'next-auth/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Resizer from 'react-image-file-resizer';
import Select from 'react-select';

type Technologies = Technology[];

type NewTalentFormProps = {
  technologies: Technologies;
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

interface LabelProps {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => {
  return (
    <label className="block mb-2 text-sm font-bold text-secondary">
      {children}
    </label>
  );
};

interface DescriptionProps {
  children: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({ children }) => {
  return <p className="my-2 text-xs text-tertiary">{children}</p>;
};

interface InputContainerProps {
  children: React.ReactNode;
}
const InputContainer: React.FC<InputContainerProps> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

const Required = () => {
  return <span className="font-light text-red-500">*</span>;
};

const NewTalentForm: React.FC<NewTalentFormProps> = ({
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
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    Technology[]
  >([]);
  const [photo, setPhoto] = useState('');
  const [userId, setUserId] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [message, setMessage] = useState({ error: false, text: '' });
  const [loadingForm, setLoadingForm] = useState(false);

  const handleTechnologies = (techSelected: Technologies) => {
    setSelectedTechnologies(techSelected);
  };

  useEffect(() => {
    const fetchUser = async (uId) => {
      setLoadingProfile(true);
      const response = await fetch(`/api/profiles/${uId}`);

      if (response.status === 200) {
        const user: Profile = await response.json();

        setSelectedTechnologies(user.technologies);
        setPhoto(user.person.photo);
        setUserId(user._id);
        setValue('email', user.person.email);
        setValue('name', user.person.firstName);
        setValue('location', user.location);
        setValue('twitter', user.person.twitter);
        setValue('linkedin', user.person.linkedin);
        setValue('github', user.person.github);
        setValue('portfolio', user.person.portfolio);
        setValue('roleId', user.role._id);
        setValue('seniorityId', user.seniority._id);
        setValue('description', user.description);
        setValue('available', user.isAvailable);
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
    emailjs.send(
      'fec_gmail',
      'talentos_ingreso',
      {
        user: session.user.name,
        id: userId,
      },
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
    );

    setLoadingForm(false);
    setTimeout(() => setMessage({ error: false, text: '' }), 5000);
  };

  const onError = (errorsLog, e) => console.log(errorsLog, e);

  if (loading && loadingProfile) {
    return (
      <div className="py-32 my-20 text-2xl text-center rounded-lg shadow bg-zinc-800 text-zinc-100">
        Cargando sesión...
      </div>
    );
  }

  return (
    <div className="overflow-hidden border-2 rounded-lg shadow bg-zinc-900 border-zinc-600">
      {message.text && (
        <div
          className={`text-center text-primary rounded p-4 m-4 ${
            message.error ? 'bg-red-600' : 'bg-emerald-700'
          }`}
        >
          {message.text}
        </div>
      )}
      {session ? (
        <div>
          {loadingForm ? (
            <div className="p-4 text-zinc-100">Enviando formulario...</div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="w-full p-6 rounded bg-zinc-900 sm:px-8 sm:pt-6 sm:pb-8"
              noValidate
            >
              <div className="flex flex-col grid-cols-2 gap-5 md:grid">
                <InputContainer>
                  <Label>
                    Usuario de Discord <Required />
                  </Label>
                  <input
                    className={`input ${errors.discord && 'border-red-400'}`}
                    type="text"
                    required
                    placeholder="Ingresa tu usuario de Discord"
                    value={session.user.name}
                    readOnly
                    {...register('discord', { required: true })}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>
                    Email <Required />
                  </Label>
                  <input
                    className={`input ${errors.email && 'border-red-400'}`}
                    type="email"
                    required
                    placeholder="Ingresa tu email"
                    value={session.user.email}
                    readOnly
                    {...register('email', { required: true })}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>
                    Nombre y Apellido <Required />
                  </Label>
                  <input
                    className={`input ${errors.name && 'border-red-400'}`}
                    type="text"
                    placeholder="Ingresa nombre completo"
                    {...register('name', { required: true })}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>
                    Lugar de residencia <Required />
                  </Label>
                  <input
                    className={`input focus:outline-none focus:ring ${
                      errors.location && 'border-red-400'
                    }`}
                    type="text"
                    required
                    placeholder="Tu ubicación actual"
                    {...register('location', { required: true })}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>Twitter</Label>
                  <Description>
                    Incluye enlace completo de tu perfil.
                  </Description>
                  <div className="relative">
                    <input
                      className={`input ${errors.twitter && 'border-red-400'}`}
                      type="url"
                      placeholder="https://twitter.com/usuario"
                      {...register('twitter')}
                    />
                  </div>
                </InputContainer>

                <InputContainer>
                  <Label>Linkedin</Label>
                  <Description>
                    Incluye enlace completo de tu perfil.
                  </Description>
                  <input
                    className={`input ${errors.linkedin && 'border-red-400'}`}
                    type="url"
                    placeholder="https://linkedin.com/in/usuario"
                    {...register('linkedin')}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>Github</Label>
                  <Description>
                    Incluye enlace completo de tu perfil.
                  </Description>
                  <input
                    className={`input ${errors.github && 'border-red-400'}`}
                    type="url"
                    placeholder="https://github.com/usuario"
                    {...register('github')}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>Portfolio</Label>
                  <Description>
                    Incluye enlace completo de tu web personal.
                  </Description>
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
                </InputContainer>

                <InputContainer>
                  <Label>
                    Rol actual o con el que te defines <Required />
                  </Label>
                  <select
                    className={`input ${errors.roleId && 'border-red-400'}`}
                    {...register('roleId', { required: true })}
                  >
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </InputContainer>

                <InputContainer>
                  <Label>
                    Seniority <Required />
                  </Label>
                  <div className="relative">
                    <select
                      className={`input ${
                        errors.seniorityId && 'border-red-400'
                      }`}
                      {...register('seniorityId', { required: true })}
                    >
                      {seniorities.map((seniority) => (
                        <option key={seniority._id} value={seniority._id}>
                          {seniority.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </InputContainer>
              </div>
              <InputContainer>
                <Label>
                  Foto de perfil <Required />
                </Label>
                <div className="flex items-center justify-start w-full space-x-4">
                  <label className="flex items-center justify-center w-32 h-32 overflow-hidden border-4 border-dashed rounded-md cursor-pointer hover:bg-zinc-100 hover:border-primary group hover:opacity-75">
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
              </InputContainer>
              <InputContainer>
                <Label>Tecnologías</Label>
                <Description>
                  Selecciona un máximo de 5 tecnologías.
                </Description>
                <Select
                  classNamePrefix="react-select"
                  className="w-full bg-transparent form-user"
                  instanceId="technologies-selector"
                  isMulti
                  placeholder=""
                  value={selectedTechnologies}
                  onChange={handleTechnologies}
                  isValidNewOption={isValidNewOption}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option._id}
                  options={
                    selectedTechnologies.length === 5 ? [] : technologies
                  }
                  noOptionsMessage={() => {
                    return selectedTechnologies.length === 5
                      ? 'Has alcanzado el máximo de opciones'
                      : 'No opciones disponibles';
                  }}
                />
              </InputContainer>
              <InputContainer>
                <Label>
                  Biografía <Required />
                </Label>
                <textarea
                  rows={5}
                  required
                  className={`input ${errors.description && 'border-red-400'}`}
                  {...register('description', { required: true })}
                  placeholder="Cuentanos un poco de tí"
                  maxLength={500}
                ></textarea>
              </InputContainer>
              <InputContainer>
                <input
                  className="inline mr-2 text-sm leading-tight border rounded text-secondary focus:outline-none focus:ring"
                  {...register('available')}
                  type="checkbox"
                />
                <label className="inline text-sm font-bold text-secondary">
                  ¿Te encuentras en búsqueda de trabajo activa?
                </label>
              </InputContainer>
              <InputContainer>
                <input
                  className={`inline mr-2 text-sm leading-tight text-secondary border rounded focus:outline-none focus:ring ${
                    errors.consent && 'border-red-400'
                  }`}
                  type="checkbox"
                  required
                  {...register('consent', { required: true })}
                />
                <label className="inline text-sm font-bold text-secondary">
                  ¿Aceptas que tu información sea compartida en la web de
                  FrontendCafé? <Required />
                </label>
              </InputContainer>
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
        <div className="p-4 text-zinc-100 bg-zinc-900">
          Para poder registrar tu perfil es necesario que inicies sesión con
          Discord. <br />
          <br />
          <Link href="/talentos/nuevo" legacyBehavior>
            <button
              onClick={() =>
                signIn('discord', {
                  callbackUrl: `${window.location.origin}/talentos/nuevo`,
                })
              }
              className="text-xs btn btn-primary md:text-md"
            >
              Iniciar sesión
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewTalentForm;