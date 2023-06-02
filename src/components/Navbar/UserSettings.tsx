'use client';

import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Spinner from '../Spinner';

interface UserSettingsProps {
  navIsOpen: boolean;
}

const UserSettings: React.FC<UserSettingsProps> = ({ navIsOpen }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <div
      className={`items-center gap-2 lg:flex lg:place-self-auto lg:justify-self-end ${
        navIsOpen ? 'm-2 flex place-self-start lg:m-0' : 'hidden'
      }`}
    >
      {session?.user ? (
        <>
          <Image
            className="rounded-full"
            src={session.user.image}
            alt="Profile image"
            width="36"
            height="36"
          />
          <div className="flex flex-col items-end gap-1 text-xs font-medium">
            <p>{session.user.name}</p>
            <button
              className="text-quaternary hover:text-primary"
              onClick={() => signOut()}
            >
              Cerrar sesión
            </button>
          </div>
        </>
      ) : (
        <button
          className="btn btn-secondary lg:ring-0"
          disabled={loading}
          onClick={() => signIn('discord')}
        >
          {loading ? (
            <>
              <Spinner /> Cargando&hellip;
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faDiscord} /> Iniciar sesión
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default UserSettings;
