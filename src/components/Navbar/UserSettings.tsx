'use client';

import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '../Spinner';

interface UserSettingsProps {
  navIsOpen: boolean;
}

const UserSettings: React.FC<UserSettingsProps> = ({ navIsOpen }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const isMentor = session?.user.roles.includes('Mentor');

  return (
    <div
      className={`items-center gap-2 lg:flex lg:place-self-auto lg:justify-self-end ${
        navIsOpen ? 'm-2 flex place-self-start lg:m-0' : 'hidden'
      }`}
    >
      {!session ? (
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
      ) : (
        <>
          {isMentor && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 0.95 }}
              className="whitespace-nowrap rounded-2xl bg-gradient-to-r from-greenFec to-slate-500 text-xs font-semibold shadow-xl transition hover:!scale-100 hover:from-greenFec/90 hover:to-slate-500/90 active:!scale-95"
            >
              <Link
                href={`/mentorias/${session.user.id}/perfil`}
                className="inline-block px-3 py-1"
              >
                Perfil de mentorias
              </Link>
            </motion.div>
          )}
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
      )}
    </div>
  );
};

export default UserSettings;
