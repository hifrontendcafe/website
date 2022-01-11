import { useState } from 'react';
import { ReactGroup } from '@/lib/types';
import { signIn, useSession } from 'next-auth/client';
import { Link } from '../../MDX/Link';
import ToastNotification from '../../ToastNotification/ToastNotification';

interface Props {
  group: ReactGroup;
}
type RequestState = 'initial' | 'loading' | 'success' | 'error';

const getButtonText = (state: RequestState, userAdded: boolean) => {
  if (state === 'loading') return 'Enviando...';
  if (userAdded) return 'Te uniste al grupo';
  return 'Unite a este grupo';
};

const AddParticipantForm: React.FC<Props> = ({ group }) => {
  const [session] = useSession();
  const [requestState, setRequestState] = useState<RequestState>('initial');
  const [userAdded, setUserAdded] = useState(false);

  const resetState = () => {
    setRequestState('initial');
  };

  const onAddParticipantSubmit = async (id: string) => {
    if (!session || !session.user || !session.user.name) {
      setRequestState('error');
      return;
    }
    setRequestState('loading');
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
      setRequestState('error');
      return;
    }
    if (result.ok) {
      setRequestState('success');
      setUserAdded(true);
    } else {
      setRequestState('error');
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
              disabled={requestState === 'loading' || userAdded}
              className="justify-items-end w-full sm:w-auto mt-2 sm:mt-0 px-3 py-2 sm:ml-2 text-sm font-small btn btn-primary disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {getButtonText(requestState, userAdded)}
            </button>
          </div>
          {requestState === 'success' && (
            <ToastNotification type="success" onDidDismiss={resetState}>
              <p>¡Te has unido correctamente al grupo!</p>
            </ToastNotification>
          )}
          {requestState === 'error' && (
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
