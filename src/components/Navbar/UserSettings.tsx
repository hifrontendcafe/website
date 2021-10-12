import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/client';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

interface UserSettingsProps {
  user?: Session['user'];
}

const UserSettings: React.FC<UserSettingsProps> = ({ user }) => {
  if (!user) {
    return (
      <button
        className="flex items-center mt-2 ml-0 btn btn-border lg:mt-0 lg:ml-4 "
        style={{ transition: 'all .15s ease' }}
        onClick={() => signIn('discord')}
      >
        <FontAwesomeIcon icon={faDiscord} width="18px" className="mr-2" />
        Iniciar Sesión
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center mt-2 lg:mt-0 lg:ml-4">
        <div>
          <Image
            className="inline-block rounded-full"
            src={user.image}
            alt="Profile image"
            width="36px"
            height="36px"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">{user.name}</p>
          <button
            className="text-xs font-medium text-gray-500 hover:text-gray-700"
            onClick={() => signOut()}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }
};

export default UserSettings;
