'use client';

import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface UserSettingsProps {
  navIsOpen: boolean;
}

const UserSettings: React.FC<UserSettingsProps> = ({ navIsOpen }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    return (
      <button
        className={`lg:flex items-center mt-2 ml-0 btn btn-border lg:mt-0 ${
          navIsOpen ? 'flex place-self-start mb-4 ml-2' : 'hidden'
        }`}
        style={{ transition: 'all .15s ease' }}
        onClick={() => signIn('discord')}
      >
        <FontAwesomeIcon icon={faDiscord} className="mr-3" />
        Loading&hellip;
      </button>
    );
  }

  if (!session?.user) {
    return (
      <button
        className={`lg:flex items-center mt-2 ml-0 btn btn-border lg:mt-0 ${
          navIsOpen ? 'flex place-self-start mb-4 ml-2' : 'hidden'
        }`}
        style={{ transition: 'all .15s ease' }}
        onClick={() => signIn('discord')}
      >
        <FontAwesomeIcon icon={faDiscord} className="mr-3" />
        Iniciar sesión
      </button>
    );
  }

  return (
    <div
      className={`lg:flex items-center mt-2 mb-0 lg:mt-0 lg:ml-4 ${
        navIsOpen ? 'flex place-self-start mb-4 ml-2' : 'hidden'
      }`}
    >
      <div>
        <Image
          className="inline-block rounded-full"
          src={session.user.image}
          alt="Profile image"
          width="36"
          height="36"
        />
      </div>
      <div className="my-auto ml-3">
        <p className="text-xs font-medium text-zinc-100">{session.user.name}</p>
        <button
          className="text-xs font-medium text-quaternary hover:text-primary"
          onClick={() => signOut()}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
