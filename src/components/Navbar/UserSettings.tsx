import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/client';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

interface UserSettingsProps {
  user?: Session['user'];
  navIsOpen: boolean;
  loading: boolean;
}

const UserSettings: React.FC<UserSettingsProps> = ({
  user,
  navIsOpen,
  loading,
}) => {
  if (loading) {
    return (
      <button
        className={`lg:flex items-center mt-2 ml-0 btn btn-border lg:mt-0 ${
          navIsOpen ? 'flex place-self-start mb-4 ml-2' : 'hidden'
        }`}
        style={{ transition: 'all .15s ease' }}
        onClick={() => signIn('discord')}
      >
        <FontAwesomeIcon icon={faDiscord} width="18px" className="mr-3" />
        Loading&hellip;
      </button>
    );
  }

  if (!user) {
    return (
      <button
        className={`lg:flex items-center mt-2 ml-0 btn btn-border lg:mt-0 ${
          navIsOpen ? 'flex place-self-start mb-4 ml-2' : 'hidden'
        }`}
        style={{ transition: 'all .15s ease' }}
        onClick={() => signIn('discord')}
      >
        <FontAwesomeIcon icon={faDiscord} width="18px" className="mr-3" />
        Iniciar sesión
      </button>
    );
  }

  if (user) {
    return (
      <div
        className={`lg:flex items-center mt-2 mb-0 lg:mt-0 lg:ml-4 ${
          navIsOpen ? 'flex place-self-start mb-4 ml-2' : 'hidden'
        }`}
      >
        <div>
          <Image
            className="inline-block rounded-full"
            src={user.image}
            alt="Profile image"
            width="36px"
            height="36px"
          />
        </div>
        <div className="my-auto ml-3">
          <p className="text-xs font-medium text-zinc-100">{user.name}</p>
          <button
            className="text-xs font-medium text-quaternary hover:text-primary"
            onClick={() => signOut()}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }
};

export default UserSettings;
