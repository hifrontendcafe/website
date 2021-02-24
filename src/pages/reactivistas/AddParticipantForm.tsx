import { useState, FormEvent } from 'react';
import { ReactGroup } from '../../lib/types';

export const AddParticipantForm = ({ group }: { group: ReactGroup }) => {
  const [discordUser, setDiscordUser] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onAddParticipantSubmit = async (
    event: FormEvent<HTMLFormElement>,
    discordUser: string,
    id: string,
  ) => {
    event.preventDefault();

    const data = {
      discordUser: discordUser,
      id: id,
    };

    try {
      setIsSuccess(true);
      const res = await fetch('/api/add-participant', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.error(e);
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        onAddParticipantSubmit(e, discordUser, group._id);
        setDiscordUser('');
      }}
      id={group.name}
      className="flex"
    >
      <input
        className="px-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
        name="discordUser"
        type="text"
        value={discordUser}
        placeholder="Usuario de Discord"
        required
        disabled={isSuccess}
        onChange={(e) => setDiscordUser(e.target.value)}
      />
      {isSuccess === false && (
        <button
          type="submit"
          form={group.name}
          className="justify-items-end px-3 py-2 text-sm font-small text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primarydark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Unite a este grupo
        </button>
      )}
      {isSuccess && (
        <div className="justify-items-end px-3 py-2 text-sm font-small text-white border border-transparent rounded-md shadow-sm bg-primary">
          ¡Te has unido correctamente al grupo!
        </div>
      )}
      {isError && (
        <div className="justify-items-end px-3 py-2 text-sm font-small text-white border border-transparent rounded-md shadow-sm bg-red-500">
          Ha ocurrido un error
        </div>
      )}
    </form>
  );
};
