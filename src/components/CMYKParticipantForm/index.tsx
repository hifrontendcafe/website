import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSettings } from '@/lib/settings';
import { timezones } from '@/lib/timezones';
import { useSession } from 'next-auth/client';
import { FormsCMYK } from '@/pages/inscripcion-cmyk';

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
  workExperience: string;
  timeAvailability: string;
  previousKnowledge: string;
  aboutParticipant: string;
  otherQuestions: string;
  stackWanted: string;
  projects: string;
  formType: string;
  isChix: boolean;
};

const CMYKParticipantForm: React.FC<FormsCMYK & { isChix: boolean }> = ({
  type,
  isChix,
}) => {
  const {
    cmykSettings: { cmykInscription },
  } = useSettings();

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
      data.isChix = isChix;
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
    <div className="flex flex-col w-full">
      <h4 className="mb-6 px-4 font-medium text-white">
        {type === 'lider'
          ? 'Si querés sumar experiencia liderando y coordinando un equipo, tener contacto directo con mentors especializados y con el equipo de diseño. Este es tu formulario. Solo necesitas:'
          : 'Si necesitas participar de un proyecto simulando lo más cercano el día a día laboral, sumar experiencia de trabajo en equipo. Este es tu formulario. Solo necesitas:'}
      </h4>
      <ul className="mb-6 px-4 text-white">
        <li>- Perfil de Linkedin.</li>
        {type === 'lider' ? (
          <>
            <li>- Tener experiencia laboral formal mayor a un año.</li>
            <li>
              - Estar registrado en Discord y ser parte de las comunidades de
              FrontendCafé y Service Design Club.
            </li>
          </>
        ) : (
          <>
            <li>
              - Perfil de github con proyectos hechos en React o Node/Express.
            </li>
            <li>- No tener experiencia laboral formal mayor a un año.</li>
            <li>
              - Estar registrado en Discord y ser parte de las comunidades de
              FrontendCafé y Service Design Club.
            </li>
          </>
        )}
      </ul>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full grid-cols-2 gap-5 p-4 border-2 rounded border-zinc-600 text-tertiary sm:px-8 sm:pt-6 sm:pb-8 md:grid bg-zinc-900"
      >
        <input
          type="text"
          defaultValue={(session && session.user.id) || ''}
          readOnly
          hidden
          {...register('discordID', { required: true })}
        />

        <input
          type="text"
          defaultValue={type || ''}
          readOnly
          hidden
          {...register('formType', { required: true })}
        />

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            Usuario de Discord
          </label>
          <div className="relative">
            <input
              className="input focus:outline-none focus:ring"
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

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Email*</label>
          <input
            className="input focus:outline-none focus:ring"
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

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Nombre*</label>
          <input
            className="input focus:outline-none focus:ring"
            type="text"
            placeholder="Ingresa tu nombre"
            autoComplete="off"
            {...register('firstName', { required: true })}
          />
          {errors.firstName && (
            <p className="pl-1 text-sm text-red-600">Nombre es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Apellido*</label>
          <input
            className="input focus:outline-none focus:ring"
            type="text"
            placeholder="Ingresa tu apellido"
            autoComplete="off"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && (
            <p className="pl-1 text-sm text-red-600">Apellido es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Zona horaria</label>
          <select
            id="timezone"
            {...register('timezone', { required: true })}
            className="input focus:outline-none focus:ring"
          >
            <option value="">Por favor elige una opción</option>
            {timezones.map((tz) => (
              <option value={tz.text} key={tz.text}>
                {tz.text}
              </option>
            ))}
          </select>
          {errors.timezone && (
            <p className="pl-1 text-sm text-red-600">
              Zona horaria es requerido
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Github*</label>
          <input
            className="input focus:outline-none focus:ring"
            type="url"
            placeholder="https://www.github.com/usuario"
            autoComplete="off"
            {...register('github', { required: true })}
          />
          {errors.github && (
            <p className="pl-1 text-sm text-red-600">GitHub es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Twitter</label>
          <input
            className="input focus:outline-none focus:ring"
            type="url"
            placeholder="https://www.twitter.com/usuario"
            autoComplete="off"
            {...register('twitter', { required: false })}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">LinkedIn*</label>
          <input
            className="input focus:outline-none focus:ring"
            type="url"
            placeholder="https://www.linkedin.com/in/usuario"
            autoComplete="off"
            {...register('linkedIn', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            {type === 'lider'
              ? '¿Ya tienes experiencia liderando un equipo?*'
              : '¿Ya tienes experiencia laboral en IT?*'}
          </label>
          <select
            id="experience"
            {...register('experience', { required: true })}
            className="input focus:outline-none focus:ring"
          >
            <option value="">Por favor elige una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
          {errors.experience && (
            <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            Experiencia laboral*
          </label>
          <select
            id="workExperience"
            {...register('workExperience', { required: true })}
            className="input focus:outline-none focus:ring"
          >
            <option value="">Por favor elige una opción</option>
            {type === 'lider' ? (
              <>
                <option value="level3">Hasta 1 año</option>
                <option value="level4">Entre 1 año y 3 años</option>
                <option value="level5">Más de 3 años</option>
              </>
            ) : (
              <>
                <option value="level0">Hasta 6 meses</option>
                <option value="level1">Entre 6 meses y 1 año</option>
                <option value="level2">Más de un año</option>
              </>
            )}
          </select>
          {errors.workExperience && (
            <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            ¿Te interesa front (React) o back (Node/Express)?*
          </label>
          <select
            id="stackWanted"
            {...register('stackWanted', { required: true })}
            className="input focus:outline-none focus:ring"
          >
            <option value="">Por favor elige una opción</option>
            <option value="front">Frontend (React)</option>
            <option value="back">Backend (Node/Express)</option>
            <option value="both">Ambos</option>
          </select>
          {errors.stackWanted && (
            <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            Disponibilidad horaria*
          </label>
          <select
            id="timeAvailability"
            {...register('timeAvailability', { required: true })}
            className="input focus:outline-none focus:ring"
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

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            ¿Que proyecto te interesa más?*
          </label>
          <select
            id="projects"
            {...register('projects', { required: true })}
            className="input focus:outline-none focus:ring"
          >
            <option value="">Por favor elige una opción</option>
            <option value="flashcards">App Flashcards</option>
            <option value="callForPapers">
              App Administrador call for papars
            </option>
            <option value="both">No tengo preferencias</option>
          </select>
          {errors.projects && (
            <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            Conocimientos previos*
          </label>
          <textarea
            rows={1}
            className="input focus:outline-none focus:ring"
            placeholder="Si tienes conocimientos, cuéntanos"
            {...register('previousKnowledge', { required: true })}
          ></textarea>
          {errors.previousKnowledge && (
            <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            {type === 'lider'
              ? 'Contanos algo sobre vos y por qué te interesa liderar un equipo*'
              : 'Contanos algo sobre vos y por qué te interesa participar*'}
          </label>
          <textarea
            rows={4}
            className="input focus:outline-none focus:ring"
            placeholder="Conocerte nos permitirá saber ubicarte en los proyectos"
            {...register('aboutParticipant', { required: true })}
          ></textarea>
          {errors.aboutParticipant && (
            <p className="pl-1 text-sm text-red-600">Este campo es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            ¿Tenés alguna duda que quieras comunicarnos?
          </label>
          <textarea
            rows={4}
            className="input focus:outline-none focus:ring"
            {...register('otherQuestions', { required: false })}
          ></textarea>
        </div>

        <div className="col-span-2">
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center btn btn-primary"
            >
              {isLoading ? 'Enviando...' : 'Enviar registro'}
            </button>
          </div>
          {(isError || isSuccess || isInfo) && (
            <div
              className={`flex items-center ${
                isError
                  ? 'bg-red-500'
                  : isInfo
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              } text-primary rounded text-sm font-bold px-4 py-3 mt-5 transition-all duration-500 ease-in-out ${
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
          )}
        </div>
      </form>
    </div>
  );
};

export default CMYKParticipantForm;
