import { TimeSlot } from '@/lib/types';
import { useSession } from 'next-auth/client';
import React, { SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

type FormInputs = {
  discordID: string;
  discordUser: string;
  email: string;
  name: string;
  info: string;
};

type Step2Props = {
  onSubmit: (data: FormInputs) => void;
};

const CalomentorStep2: React.FC<Step2Props> = ({ onSubmit }) => {
  const [session] = useSession();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormInputs>();

  const handleOnSubmit = async (data: FormInputs) => {
    await onSubmit(data);
    return reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col w-full bg-white rounded"
      >
        {console.log(session)}
        <input
          type="text"
          defaultValue={(session && session.user.id) || ''}
          readOnly
          hidden
          {...register('discordID', { required: true })}
        />
        <div className="px-5 mb-4">
          <label className="block mb-2 text-lg font-bold md:text-1xl">
            Usuario de Discord
          </label>
          <div className="relative">
            <input
              className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Ingresa tu usuario de Discord"
              autoComplete="off"
              defaultValue={(session && session.user.name) || ''}
              readOnly
              {...register('discordUser', {
                required: 'El usuario es requerido',
              })}
            />
          </div>
        </div>
        <div className="px-5 mb-4">
          <label className="block mb-2 text-lg font-bold md:text-1xl">
            Email
          </label>
          <input
            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Ingresa tu email"
            autoComplete="off"
            readOnly
            defaultValue={(session && session.user.email) || ''}
            {...register('email', { required: true })}
          />
          {errors.email && (
            <p className="pl-1 text-sm text-red-600">Email es requerido</p>
          )}
        </div>
        <div className="px-5 mb-4">
          <label className="block mb-2 text-lg font-bold md:text-1xl">
            Nombre*
          </label>
          <input
            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Ingresa tu nombre"
            autoComplete="off"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <p className="pl-1 text-sm text-red-600">Nombre es requerido</p>
          )}
        </div>
        <div className="px-5 mb-4">
          <label className="block mb-2 text-lg font-bold md:text-1xl">
            Contanos*
          </label>
          <textarea
            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu nombre"
            autoComplete="off"
            {...register('info', { required: true })}
          />
          {errors.info && (
            <p className="pl-1 text-sm text-red-600">Nombre es requerido</p>
          )}
        </div>
      </form>
    </>
  );
};

export default CalomentorStep2;
