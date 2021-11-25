import { useState } from 'react';
import { ReactGroup } from '@/lib/types';
import { DiscordUserTooltip } from '@/components/Reactivistas/FormHelpers';

interface Props {
  group: ReactGroup;
}

const AddParticipantForm: React.FC<Props> = ({ group }) => {
  const [discordUser, setDiscordUser] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onAddParticipantSubmit = async (discordUser: string, id: string) => {
    setIsLoading(true);

    try {
      await fetch('/api/add-participant', {
        method: 'POST',
        body: JSON.stringify({
          discordUser: discordUser,
          id: id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsLoading(false);
      setIsSuccess(true);
      setDiscordUser('');
    } catch (e) {
      console.error(e);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => setIsError(false), 5000);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddParticipantSubmit(discordUser, group._id);
      }}
      id={group.name}
    >
      <div className="flex flex-wrap sm:flex-row">
        <div className="relative flex-grow">
          <input
            className="w-full h-full px-3 py-2 flex-1 text-sm leading-tight text-coolGray-700 border rounded appearance-none focus:outline-none focus:ring"
            name="discordUser"
            type="text"
            value={discordUser}
            placeholder="Usuario de Discord"
            required
            pattern="(.*)#(\d{4})"
            onChange={(e) => setDiscordUser(e.target.value)}
          />
          <DiscordUserTooltip />
        </div>
        <button
          type="submit"
          form={group.name}
          disabled={isLoading || isSuccess}
          className="justify-items-end w-full sm:w-auto mt-2 sm:mt-0 px-3 py-2 sm:ml-2 text-sm font-small text-coolGray-50 border border-transparent rounded-md shadow-sm bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? 'Enviando...' : 'Unite a este grupo'}
        </button>
      </div>
      {isError && (
        <div className="mt-4 text-sm text-red-500">Ha ocurrido un error.</div>
      )}
      {isSuccess && (
        <div className="mt-4 text-sm text-green-500 font-bold">
          ¡Te has unido correctamente al grupo!
        </div>
      )}
    </form>
  );
};

export default AddParticipantForm;
