import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSettings } from '@/lib/settings';
import { timezones } from '@/lib/timezones';
import { useSession } from 'next-auth/client';

type FormInputs = {
  discordID: string;
  discordUser: string;
  email: string;
  firstName: string;
  lastName: string;
  timezone: string;
  github: string;
  twitter: string;
  linkedIn: string;
  experience: string;
  participationLevel: string;
  timeAvailability: string;
  previousKnowledge: string;
  aboutParticipant: string;
  otherQuestions: string;
};

const CMYKParticipantForm: React.FC = () => {
  const { cmykInscription } = useSettings();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormInputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const [session] = useSession();

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    if (cmykInscription) {
      try {
        const res = await fetch('/api/add-cmyk-participant', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const formattedRes = await res.json();
        if (formattedRes.status == 'registered') {
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 5000);
        } else {
          setIsInfo(true);
          setTimeout(() => setIsInfo(false), 5000);
        }
        setIsLoading(false);
        reset();
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
        setTimeout(() => setIsError(false), 5000);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full grid-cols-2 gap-5 pt-6 pb-8 mb-4 bg-white rounded lg:px-24 md:px-16 md:grid"
    >
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
            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
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
          Email*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
          type="email"
          placeholder="Ingresa tu email"
          autoComplete="off"
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
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
          type="text"
          placeholder="Ingresa tu nombre"
          autoComplete="off"
          {...register('firstName', { required: true })}
        />
        {errors.firstName && (
          <p className="pl-1 text-sm text-red-600">Nombre es requerido</p>
        )}
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Apellido*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
          type="text"
          placeholder="Ingresa tu apellido"
          autoComplete="off"
          {...register('lastName', { required: true })}
        />
        {errors.lastName && (
          <p className="pl-1 text-sm text-red-600">Apellido es requerido</p>
        )}
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Zona horaria
        </label>
        <select
          id="timezone"
          {...register('timezone', { required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
        >
          <option value="">Por favor elige una opción</option>
          {timezones.map((tz) => (
            <option value={tz.text} key={tz.text}>
              {tz.text}
            </option>
          ))}
        </select>
        {errors.timezone && (
          <p className="pl-1 text-sm text-red-600">Zona horaria es requerido</p>
        )}
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Github*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
          type="url"
          placeholder="https://www.github.com/usuario"
          autoComplete="off"
          {...register('github', { required: true })}
        />
        {errors.github && (
          <p className="pl-1 text-sm text-red-600">GitHub es requerido</p>
        )}
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Twitter
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
          type="url"
          placeholder="https://www.twitter.com/usuario"
          autoComplete="off"
          {...register('twitter', { required: false })}
        />
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          LinkedIn
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
          type="url"
          placeholder="https://www.linkedin.com/in/usuario"
          autoComplete="off"
          {...register('linkedIn', { required: false })}
        />
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          ¿Ya tienes experiencia laboral en IT?*
        </label>
        <select
          id="experience"
          {...register('experience', { required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
        >
          <option value="">Por favor elige una opción</option>
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>
        {errors.experience && (
          <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
        )}
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Nivel de participación*
        </label>
        <select
          id="participationLevel"
          {...register('participationLevel', { required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
        >
          <option value="">Por favor elige una opción</option>
          <option value="level1">Nivel 1 (HTML - CSS - JavaScript)</option>
          <option value="level2">
            Nivel 2 (React JS - Librería de CSS a elección)
          </option>
        </select>
        {errors.participationLevel && (
          <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
        )}
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Disponibilidad horaria*
        </label>
        <select
          id="timeAvailability"
          {...register('timeAvailability', { required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
        >
          <option value="">Por favor elige una opción</option>
          <option value=">=6hours">6 o más horas semanales</option>
          <option value=">4<6hours">Entre 4 y 6 horas semanales</option>
          <option value=">2<4hours">Entre 2 y 4 horas semanales</option>
        </select>
        {errors.timeAvailability && (
          <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
        )}
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Conocimientos previos*
        </label>
        <textarea
          rows={1}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
          placeholder="Si tienes conocimientos, cuéntanos"
          {...register('previousKnowledge', { required: true })}
        ></textarea>
        {errors.previousKnowledge && (
          <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
        )}
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Contanos algo sobre vos y por qué te interesa formar parte de este
          proyecto*
        </label>
        <textarea
          rows={2}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
          placeholder="Conocerte nos permitirá saber ubicarte en los proyectos"
          {...register('aboutParticipant', { required: true })}
        ></textarea>
        {errors.aboutParticipant && (
          <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
        )}
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          ¿Tenés alguna pregunta o duda que quieras comunicarnos?
        </label>
        <textarea
          rows={2}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-zinc-700 border border-zinc-500 rounded appearance-none focus:outline-none focus:ring"
          {...register('otherQuestions', { required: false })}
        ></textarea>
      </div>
      <div className="col-span-2 pt-8">
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-3 mr-6 font-medium text-gray-50 border border-transparent rounded-md shadow-sm text-md bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>

        <div
          className={`flex items-center ${
            isError ? 'bg-red-500' : isInfo ? 'bg-amber-500' : 'bg-emerald-500'
          } text-gray-50 text-sm font-bold px-4 py-3 mt-5 transition-all	 duration-500 ease-in-out ${
            isSuccess || isError || isInfo ? 'opacity-100' : 'opacity-0'
          }`}
          role="alert"
        >
          <svg
            className="w-4 h-4 mr-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          {isSuccess && <p>Registro envíado. ¡Muchas gracias!</p>}
          {isInfo && (
            <p>Solo puedes registrarte una única vez. ¡Muchas Gracias!</p>
          )}
          {isError && <p>Ocurrió un error al enviar el registro.</p>}
        </div>
      </div>
    </form>
  );
};

export default CMYKParticipantForm;
