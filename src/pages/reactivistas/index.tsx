import Layout from '../../components/Layout';
import { createReactGroup } from '../../lib/api';
import { useForm } from 'react-hook-form';
import { ReactGroup } from '../../lib/types';

const ReactGroupPage: React.FC = () => {
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
                </h2>
              </div>
            </div>
          </div>
          <ReactGroupForm />
        </div>
      </div>
    </Layout>
  );
};

const ReactGroupForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: ReactGroup) => {
    const response = await createReactGroup(data);
    console.log(response);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full grid-cols-2 gap-5 px-8 pt-6 pb-8 mb-4 bg-white rounded md:grid"
    >
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Nombre del grupo</label>
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
        <label className="block mb-2 text-sm font-bold">Tema</label>
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
          Representante del grupo
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="team-leader"
          type="text"
          placeholder="Ingresa tu user de discord"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">
          Material de estudio
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="study-material"
          type="text"
          placeholder="Ingresa el material de estudio"
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
          name="meeting-type"
          placeholder="Ingresa la dinamica que se va a utilizar en su grupo de estudio"
          required
          ref={register({ required: true })}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Plan de estudio</label>
        <textarea
          rows={5}
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="plan"
          placeholder="Ingresa como va a ser el plan de estudio"
          required
          ref={register({ required: true })}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">
          Fecha tentativa de inicio
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          name="date"
          type="date"
          required
          ref={register({ required: true })}
        />
      </div>
      <div className="pt-8">
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enviar propuesta de grupo
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReactGroupPage;
