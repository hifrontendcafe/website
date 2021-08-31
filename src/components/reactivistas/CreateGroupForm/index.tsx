import Link from 'next/link';
import { signIn, useSession } from 'next-auth/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createDoc } from '../../../lib/api';

const CreateGroupForm: React.FC = () => {
  const [session] = useSession();

  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data) => {
    createDoc(data);
  };

  return (
    <>
      {session ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('title')} />
          <textarea
            rows={5}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Ingresa la dinámica que se va a utilizar en su grupo de estudio"
            required
            {...register('content', { required: true })}
          ></textarea>
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-3 font-medium text-white border border-transparent rounded-md shadow-sm text-md bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar propuesta'}
          </button>
        </form>
      ) : (
        <div className="p-4">
          Para poder crear un nuevo grupo de Reactivistas es necesario que
          inicies sesión con Discord. <br />
          <br />
          <Link href="/reactivistas">
            <button
              onClick={() =>
                signIn('discord', {
                  callbackUrl: `${window.location.origin}/reactivistas`,
                })
              }
              className="text-xs btn btn-primary md:text-md"
            >
              Iniciar Sesión
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CreateGroupForm;
