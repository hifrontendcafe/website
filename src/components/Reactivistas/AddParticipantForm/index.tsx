import { useState } from 'react';
import { ReactGroup } from '@/lib/types';
import { signIn, useSession } from 'next-auth/client';
import { Link } from '../../MDX/Link';
import ToastNotification from '../../ToastNotification/ToastNotification';

interface Props {
  group: ReactGroup;
}

const AddParticipantForm: React.FC<Props> = ({ group }) => {
  const [session] = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const resetState = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
  };

  const onAddParticipantSubmit = async (id: string) => {
    if (!session || !session.user || !session.user.name) {
      setIsLoading(false);
      setIsError(true);
      return;
    }
    setIsLoading(true);
    let result: Response;
    try {
      result = await fetch('/api/add-participant', {
        method: 'POST',
        body: JSON.stringify({
          participant: session.user,
          id: id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
      return;
    }
    if (result.ok) {
      setIsLoading(false);
      setIsSuccess(true);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <>
      {session ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAddParticipantSubmit(group._id);
          }}
          id={group.name}
        >
          <div className="flex flex-wrap sm:flex-row">
            <div className="relative flex-grow">
              <input
                className="input focus:outline-none focus:ring"
                type="text"
                placeholder="Ingresa tu usuario de Discord"
                value={session.user.name}
                required
                readOnly
                pattern="(.*)#(\d{4})"
              />
            </div>
            <button
              type="submit"
              form={group.name}
              disabled={isLoading || isSuccess}
              className="justify-items-end w-full sm:w-auto mt-2 sm:mt-0 px-3 py-2 sm:ml-2 text-sm font-small btn btn-primary"
            >
              {isLoading ? 'Enviando...' : 'Unite a este grupo'}
            </button>
          </div>
          {isSuccess && (
            <ToastNotification type="success" onDidDismiss={resetState}>
              <p>¡Te has unido correctamente al grupo!</p>
            </ToastNotification>
          )}
          {isError && (
            <ToastNotification type="error" onDidDismiss={resetState}>
              <p>Ha ocurrido un error.</p>
            </ToastNotification>
          )}
        </form>
      ) : (
        <div className="p-6 border-2 border-gray-600 rounded-md text-coolGray-200">
          Para poder sumarte al grupo es necesario que inicies sesión con
          Discord. <br />
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
              Iniciar sesión
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default AddParticipantForm;
