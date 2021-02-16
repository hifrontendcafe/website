import Layout from '../../components/Layout';
import { createReactGroup, getPersonByDiscordId } from '../../lib/api';
import { useForm } from 'react-hook-form';
import { ReactGroup } from '../../lib/types';
import { useState } from 'react';
import Modal from '../../components/Modal';

const ReactGroupPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout title="Iniciativas">
      <div className="pb-24 bg-indigo-100 sm:pt-10">
        <div className="container mx-auto overflow-hidden bg-white rounded-lg shadow ">
          <div className="px-6 pt-20 border-b border-gray-200 md:py-5 md:px-8">
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-7 text-black sm:text-2xl sm:leading-9 sm:truncate">
                  Reactivistas
                </h1>
                <h2 className="font-medium leading-7 text-md text-primary sm:leading-9 sm:truncate">
                  Propuesta de nuevo grupo de estudio
                  <span className="text-black mx-2">-</span>
                  <span
                    className="cursor-pointer text-blue-400"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Ver Requisitos
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <ReactGroupForm />
        </div>
      </div>
      <button></button>

      <Modal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title="Requisitos para iniciar un nuevo grupo"
      >
        <div className="text-sm overflow-auto px-2">
          <li>Un nombre (puede ser cualquier nombre)</li>
          <li>
            Un tema y su correspondiente material de estudio (curso,
            libro,documentación, etc)
          </li>
          <li>Un representante de grupo</li>
          <li>
            Una definición en cuanto a la dinámica de encuentro de los
            participantes ( periodicidad, día, hora)
          </li>
          <li>Un plan, con su respectivo bosquejo, de entre 4 y 16 semanas</li>
          <h2 className="text-base my-2 font-semibold">Observaciones</h2>
          <li>
            El grupo podrá iniciar sus actividades una vez que cuente con el
            mínimo de participantes, que es 4. El máximo será de 10.
          </li>
          <li>
            La organización de Reactivistas revisará las solicitudes y aprobará
            toda aquella que cuente con los requisitos solicitados.
          </li>
        </div>
      </Modal>
    </Layout>
  );
};

const ReactGroupForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit = async (data: ReactGroup) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/create-react-group', {
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
      className="flex flex-col w-full grid-cols-2 gap-5 px-8 pt-6 pb-8 mb-4 bg-white rounded md:grid"
    >
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">
          Nombre del grupo*
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="name"
          type="text"
          placeholder="Nombre del grupo"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">User de Discord*</label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="teamCaptain.id"
          type="text"
          placeholder="Ingresa tu usuario de Discord"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Tema*</label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="topic"
          type="text"
          placeholder="Ingresa el tema"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">
          Material de estudio*
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="studyMaterial"
          type="url"
          placeholder="Ingresa un link al material de estudio seleccionado"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">
          Estilo de reuniones
        </label>
        <textarea
          rows={5}
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="meetings"
          placeholder="Ingresa la dinamica que se va a utilizar en su grupo de estudio"
          ref={register}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Plan de estudio</label>
        <textarea
          rows={5}
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="plan"
          placeholder="Ingresa como va a ser el plan de estudio"
          ref={register}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">
          Fecha tentativa de inicio
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="startDate"
          type="date"
          ref={register}
        />
      </div>
      <div className="pt-8">
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-3 text-md font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar propuesta'}
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
          {isSuccess && <p>Propuesta enviada. ¡Muchas gracias!</p>}
          {isError && <p>Ocurrió un error al enviar la propuesta.</p>}
        </div>
      </div>
    </form>
  );
};

export default ReactGroupPage;
