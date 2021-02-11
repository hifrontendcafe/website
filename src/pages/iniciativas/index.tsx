import Hero from '../../components/Hero';
import Layout from '../../components/Layout';

const InitiativesPage: React.FC = ({}) => {
  return (
    <Layout title="Iniciativas">
      <Hero small title="Iniciativas" />
      <div className="bg-indigo-100 sm:pt-10 pb-24">
        <div className=" container mx-auto min-h-screen bg-white overflow-hidden shadow rounded-lg">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div></div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-primary sm:text-2xl sm:leading-9 sm:truncate">
                  Iniciativas
                </h2>
              </div>
            </div>
          </div>
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="p-5">
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nombre
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="name"
                      className="max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-teal-600 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Tema
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="topic"
                      className="max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-teal-600 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Material de estudio
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="study-material"
                      className="max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-teal-600 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Representante del grupo
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="team-representative"
                      className="max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-teal-600 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Participantes
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="team-members"
                      className="max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-teal-600 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Estilo de reuniones
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      name="meeting-type"
                      className="max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-teal-600 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Plan
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      name="plan"
                      className="max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-teal-600 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Fecha de inicio
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="datetime-local"
                      name="date"
                      className="max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-teal-600 rounded-md"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default InitiativesPage;
