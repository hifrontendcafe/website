import { useForm } from 'react-hook-form';
import { CMYKParticipant } from '../../lib/types';
import { useState } from 'react';
import { DiscordUserTooltip } from '../reactivistas/FormHelpers';
import { useSettings } from '@/hooks/api';

const CMYKParticipantForm: React.FC = () => {
  const {
    data: { cmykInscription },
  } = useSettings();

  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit = async (data: CMYKParticipant) => {
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

        await res.json();
        setIsSuccess(true);
        setIsLoading(false);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
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
      className="flex flex-col w-full grid-cols-2 gap-5 px-8 pt-6 pb-8 mb-4 lg:px-24 md:px-16 bg-white rounded md:grid"
    >
      <div className="mb-4 lg:mr-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Usuario de Discord*
        </label>
        <div className="relative">
          <input
            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
            type="text"
            placeholder="Ingresa tu usuario de Discord"
            autoComplete="off"
            required
            pattern="(.*)#(\d{4})"
            title="Usuario inválido. Ej: Usuario#1234"
            {...register('discordUser', { required: true })}
          />
          <DiscordUserTooltip />
        </div>
      </div>
      <div className="mb-4 lg:ml-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Email*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          type="email"
          placeholder="Ingresa tu email"
          autoComplete="off"
          required
          {...register('email', { required: true })}
        />
      </div>
      <div className="mb-4 lg:mr-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Nombre*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          type="text"
          placeholder="Ingresa tu nombre"
          autoComplete="off"
          required
          {...register('firstName', { required: true })}
        />
      </div>
      <div className="mb-4 lg:ml-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Apellido*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          type="text"
          placeholder="Ingresa tu apellido"
          autoComplete="off"
          required
          {...register('lastName', { required: true })}
        />
      </div>
      <div className="mb-4 lg:mr-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Github*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          type="url"
          placeholder="Ingresa tu perfil de Github"
          autoComplete="off"
          required
          {...register('github', { required: true })}
        />
      </div>
      <div className="mb-4 lg:ml-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Twitter
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          type="url"
          placeholder="Ingresa tu perfil de Twitter"
          autoComplete="off"
          {...register('twitter', { required: false })}
        />
      </div>
      <div className="mb-4 lg:mr-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          LinkedIn
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          type="url"
          placeholder="Ingresa tu perfil de LinkedIn"
          autoComplete="off"
          {...register('linkedIn', { required: false })}
        />
      </div>
      <div className="mb-4 lg:ml-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          ¿Ya tienes experiencia laboral en IT?*
        </label>
        <select
          id="experience"
          required
          {...register('experience', { required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-900 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          defaultValue={'default'}
        >
          <option value="default" disabled>
            Por favor elige una opción
          </option>
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mb-4 lg:mr-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Nivel de participación*
        </label>
        <select
          id="participationLevel"
          required
          {...register('participationLevel', { required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-900 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          defaultValue={'default'}
        >
          <option value="default" disabled>
            Por favor elige una opción
          </option>
          <option value="level1">Nivel 1 (HTML - CSS - JavaScript)</option>
          <option value="level2">
            Nivel 2 (React JS - Librería de CSS a elección)
          </option>
        </select>
      </div>
      <div className="mb-4 lg:ml-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Disponibilidad horaria*
        </label>
        <select
          id="timeAvailability"
          required
          {...register('timeAvailability', { required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-900 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          defaultValue={'default'}
        >
          <option value="default" disabled>
            Por favor elige una opción
          </option>
          <option value=">=6hours">6 o más horas semanales</option>
          <option value=">4<6hours">Entre 4 y 6 horas semanales</option>
          <option value=">2<4hours">Entre 2 y 4 horas semanales</option>
        </select>
      </div>
      <div className="mb-4 lg:mr-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Contanos algo sobre vos y por qué te interesa formar parte de este
          proyecto*
        </label>
        <textarea
          rows={2}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          placeholder="Conocerte nos permitirá saber ubicarte en los proyectos"
          required
          {...register('aboutParticipant', { required: true })}
        ></textarea>
      </div>
      <div className="mb-4 lg:ml-20">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          Conocimientos previos*
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          placeholder="Si tienes conocimientos, cuéntanos"
          required
          {...register('previousKnowledge', { required: true })}
        ></textarea>
      </div>
      <div className="mb-4 col-span-2">
        <label className="block mb-2 text-lg md:text-1xl font-bold">
          ¿Tenés alguna pregunta o duda que quieras comunicarnos?
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline placeholder-gray-700"
          {...register('otherQuestions', { required: false })}
        ></textarea>
      </div>
      <div className="pt-8 col-span-2">
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-3 text-md font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar registro'}
          </button>
        </div>

        <div
          className={`flex items-center ${
            isError ? 'bg-red-500' : 'bg-green-500'
          } text-white text-sm font-bold px-4 py-3 mt-5 transition-all	 duration-500 ease-in-out ${
            isSuccess || isError ? 'opacity-100' : 'opacity-0'
          }`}
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          {isSuccess && <p>Registro envíado. ¡Muchas gracias!</p>}
          {isError && <p>Ocurrió un error al enviar el registro.</p>}
        </div>
      </div>
    </form>
  );
};

export default CMYKParticipantForm;
