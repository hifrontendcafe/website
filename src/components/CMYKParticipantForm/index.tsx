import { useForm } from 'react-hook-form';
import { CMYKParticipant } from '@/lib/types';
import { useState } from 'react';
import { useSettings } from '@/hooks/api';
import { timezones } from '@/lib/timezones';
import { useSession } from 'next-auth/client';

const CMYKParticipantForm: React.FC = () => {
  const {
    data: { cmykInscription },
  } = useSettings();

  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const [session, loading] = useSession();

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
        name="discordID"
        type="text"
        required
        defaultValue={(session && session.user.id) || ''}
        readOnly
        hidden
        ref={register({ required: true })}
      />

      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Usuario de Discord
        </label>
        <div className="relative">
          <input
            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
            name="discordUser"
            type="text"
            placeholder="Ingresa tu usuario de Discord"
            autoComplete="off"
            required
            defaultValue={(session && session.user.name) || ''}
            readOnly
            ref={register({ required: true })}
          />
        </div>
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Email*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="Ingresa tu email"
          autoComplete="off"
          required
          defaultValue={(session && session.user.email) || ''}
          ref={register({ required: true })}
        />
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Nombre*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          name="firstName"
          type="text"
          placeholder="Ingresa tu nombre"
          autoComplete="off"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Apellido*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          name="lastName"
          type="text"
          placeholder="Ingresa tu apellido"
          autoComplete="off"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Zona horaria
        </label>
        <select
          name="timezone"
          id="timezone"
          required
          ref={register({ required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          defaultValue={'default'}
        >
          <option value="default" disabled>
            Por favor elige una opción
          </option>
          {timezones.map((tz) => (
            <option value={tz.text} key={tz.text}>
              {tz.text}
            </option>
          ))}
        </select>
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Github*
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          name="github"
          type="url"
          placeholder="Ingresa la url de tu perfil de Github"
          autoComplete="off"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Twitter
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          name="twitter"
          type="url"
          placeholder="Ingresa la url de tu perfil de Twitter"
          autoComplete="off"
          ref={register({ required: false })}
        />
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          LinkedIn
        </label>
        <input
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          name="linkedIn"
          type="url"
          placeholder="Ingresa la url de tu perfil de LinkedIn"
          autoComplete="off"
          ref={register({ required: false })}
        />
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          ¿Ya tienes experiencia laboral en IT?*
        </label>
        <select
          name="experience"
          id="experience"
          required
          ref={register({ required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          defaultValue={'default'}
        >
          <option value="default" disabled>
            Por favor elige una opción
          </option>
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Nivel de participación*
        </label>
        <select
          name="participationLevel"
          id="participationLevel"
          required
          ref={register({ required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
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
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Disponibilidad horaria*
        </label>
        <select
          name="timeAvailability"
          id="timeAvailability"
          required
          ref={register({ required: true })}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
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
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Conocimientos previos*
        </label>
        <textarea
          rows={1}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          name="previousKnowledge"
          placeholder="Si tienes conocimientos, cuéntanos"
          required
          ref={register({ required: true })}
        ></textarea>
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          Contanos algo sobre vos y por qué te interesa formar parte de este
          proyecto*
        </label>
        <textarea
          rows={2}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          name="aboutParticipant"
          placeholder="Conocerte nos permitirá saber ubicarte en los proyectos"
          required
          ref={register({ required: true })}
        ></textarea>
      </div>
      <div className="px-5 mb-4">
        <label className="block mb-2 text-lg font-bold md:text-1xl">
          ¿Tenés alguna pregunta o duda que quieras comunicarnos?
        </label>
        <textarea
          rows={2}
          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
          name="otherQuestions"
          ref={register({ required: false })}
        ></textarea>
      </div>
      <div className="col-span-2 pt-8">
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-3 mr-6 font-medium text-white border border-transparent rounded-md shadow-sm text-md bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>

        <div
          className={`flex items-center ${
            isError ? 'bg-red-500' : isInfo ? 'bg-yellow-500' : 'bg-green-500'
          } text-white text-sm font-bold px-4 py-3 mt-5 transition-all	 duration-500 ease-in-out ${
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
