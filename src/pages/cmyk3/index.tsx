import Layout from '../../components/Layout';
import { getApprovedReactGroups } from '../../lib/api';
import { useForm } from 'react-hook-form';
import { CMYKMember } from '../../lib/types';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import imgStyles from './styles.module.css';

const CMYKRegisterPage: React.FC<InferGetStaticPropsType<
  typeof getStaticProps
>> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout title="Iniciativas">
      <div
        className="container mx-auto flex px-5 pt-32 md:flex-row flex-col
        items-center"
      >
        <div
          className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col
          md:items-start md:text-left items-center text-center"
        >
          <div className="flex flex-col lg:flex-row w-full justify-between items-center">
            <div className="flex flex-col">
              <h1 className="title-font text-5xl font-extrabold text-gray-900">
                CMYK 3.0
              </h1>
              <h2
                className="title-font text-4xl font-medium
                text-gray-900"
              >
                Abril 2021
              </h2>
            </div>
            <button
              className="justify-center px-6 py-2 mt-6 text-lg font-medium text-white border border-transparent rounded-md shadow-sm bg-primary
              hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsModalOpen(true)}
            >
              Conocé el cronograma
            </button>
          </div>
          <div className="mt-12">
            <p className="mb-4 leading-relaxed text-lg">
              Desde <b>FrontendCafé</b> impulsamos el desarrollo de proyectos
              colaborativos realizados por miembros de la comunidad con el
              objetivo de ganar experiencia en un entorno profesional.
            </p>
            <p className="mb-8 leading-relaxed text-lg">
              Al participar tendrás acceso a un workshop de Github y
              acompañamiento de nuestro staff quienes estarán disponibles para
              contestar tus dudas y ayudarte para cumplir los objetivos. La
              actividad se llevará a cabo en abril 2021 y es <b>gratuita</b>.
            </p>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 md:pl-10">
          <img
            className="object-cover object-center rounded img-happy-bunch-walking"
            alt="hero"
            src="/img/Happy_Bunch_-_Walking_1.svg"
          />
        </div>
      </div>
      <div className="container mx-auto overflow-hidden bg-white rounded-lg px-5">
        <div className="pt-10 md:pt-15 lg:pt-20 md:py-5 lg:px-24 md:px-16">
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="font-bold leading-7 text-black text-2xl sm:text-2xl md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                ¡Es la hora!
              </h1>
              <h1 className="font-bold leading-7 text-black text-2xl sm:text-2xl md:text-3xl lg:text-4xl  sm:leading-9 sm:truncate py-1">
                ¡Participa de los proyectos CMYK! &#x1F396;&#xFE0F;
              </h1>
            </div>
          </div>
        </div>
        <CMYKRegisterForm />
      </div>
      <Modal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title="Cronograma CMYK 3"
        titleClasses="text-primary"
        buttonLabel="Entiendo"
        buttonClasses="text-primary"
      >
        <div className="text-sm overflow-auto px-2 ">
          <p className="my-3">
            <span className="font-semibold">05 / 04 / 21</span>&nbsp;&nbsp;
            Apertura de formulario para participantes (Hasta llenar cupo de 20
            personas).
          </p>
          <p className="my-3">
            <span className="font-semibold">08 / 04 / 21</span>&nbsp;&nbsp;
            Reunión de información, selección de grupos y asignación de
            proyectos con coordinadores.
          </p>
          <p className="my-3">
            <span className="font-semibold">09 / 04 / 21</span>&nbsp;&nbsp;
            Reunión de información con participantes y workshop gift.
          </p>
          <p className="my-3">
            <span className="font-semibold">12 / 04 / 21</span>&nbsp;&nbsp;
            Inicio oficial de CMYK 3
          </p>
          <p className="my-3">
            <span className="font-semibold">03 / 05 / 21</span>&nbsp;&nbsp;
            Presentación de Proyectos.
          </p>
          <h2 className="text-base my-2 font-semibold">Observaciones</h2>
          <p>
            Los horarios son flexibles, pero el proyecto requiere que tengas
            tiempo disponible para dedicarle al mismo. Te pedimos que te
            inscribas solamente si consideras que tenes el tiempo para asumir el
            compromiso durante las tres semanas que dura el proyecto.
          </p>
        </div>
      </Modal>
    </Layout>
  );
};

const CMYKRegisterForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [radioButton, setRadioButton] = useState<string>('level1');

  const onSubmit = async (data: CMYKMember) => {
    setIsLoading(true);
    data.participationLevel = radioButton;
    try {
      const res = await fetch('/api/add-cmyk-participant', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await res.json();
      setIsSuccess(true);
      setIsLoading(false);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => setIsError(false), 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full grid-cols-2 gap-5 px-8 pt-6 pb-8 mb-4 lg:px-24 md:px-16 bg-white rounded md:grid"
    >
      <div className="mb-4 mr-20">
        <label className="block mb-2 text-md font-bold">
          Usuario de Discord*
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="discordUser"
          type="text"
          placeholder="Ingresa tu usuario de Discord"
          autoComplete="off"
          required
          pattern="(.*)#(\d{4})"
          title="Usuario inválido. Ej: Usuario#1234"
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4 mr-20">
        <label className="block mb-2 text-md font-bold">Email*</label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="Ingresa tu email"
          autoComplete="off"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">Nombre*</label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="firstName"
          type="text"
          placeholder="Ingresa tu nombre"
          autoComplete="off"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">Apellido*</label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="lastName"
          type="text"
          placeholder="Ingresa tu apellido"
          autoComplete="off"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">Github*</label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="github"
          type="url"
          placeholder="Ingresa tu perfil de Github"
          autoComplete="off"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">LinkedIn</label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="linkedIn"
          type="url"
          placeholder="Ingresa tu perfil de LinkedIn"
          autoComplete="off"
          ref={register({ required: false })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">
          Nivel de Participación*
        </label>
        <div className="flex items-center">
          <input
            id="level1Radio"
            type="radio"
            name="participationLevel"
            value="level1"
            onChange={() => setRadioButton('level1')}
            required={true}
            checked={radioButton === 'level1'}
          ></input>
          <label htmlFor="level1Radio" className="flex cursor-pointer ml-2">
            Nivel 1 (HTML - CSS - JavaScript)
          </label>
        </div>
        <div className="flex items-center flex-column">
          <input
            id="level2Radio"
            type="radio"
            name="participationLevel"
            value="level2"
            onChange={() => setRadioButton('level2')}
            checked={radioButton === 'level2'}
          ></input>
          <label htmlFor="level2Radio" className="flex cursor-pointer ml-2">
            Nivel 2 (React JS - Librería de CSS a elección)
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">
          Disponibilidad Horaria*
        </label>
        <select
          name="timeAvailability"
          id="timeAvailability"
          required
          ref={register({ required: true })}
          className="w-full px-3 py-2 text-sm leading-tight text-gray-900 border rounded appearance-none focus:outline-none focus:shadow-outline"
          defaultValue={'default'}
        >
          <option value="default" disabled>
            Por favor elija una opción
          </option>
          <option value="6hours">6 horas semanales aproximadamente</option>
          <option value="4hours">4 horas semanales aproximadamente</option>
          <option value="2hours">2 horas semanales aproximadamente</option>
          <option value="<2hours">Menos de 2 horas semanales</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">
          Contanos algo sobre vos y por qué te interesa formar parte de este
          proyecto*
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="aboutMember"
          required
          ref={register({ required: true })}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">
          Conocimientos Previos*
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="previousKnowledge"
          placeholder="Ingresa cuáles son tus conocimientos previos"
          required
          ref={register({ required: true })}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">
          ¿Ya tienes experiencia laboral en IT?*
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="experience"
          required
          ref={register({ required: true })}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-md font-bold">
          ¿Tenés alguna pregunta o duda que quieras comunicarnos?
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="otherQuestions"
          required
          ref={register({ required: false })}
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
          {isSuccess && <p>Registro enviado. ¡Muchas gracias!</p>}
          {isError && <p>Ocurrió un error al enviar el registro.</p>}
        </div>
      </div>
    </form>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getApprovedReactGroups(preview);

  return {
    props: {
      data,
      preview,
    },
    revalidate: 1,
  };
};

export default CMYKRegisterPage;
