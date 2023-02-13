import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/client';
import { useWarnings } from '../MentorList/useWarnings';
import SimpleModal from '../SimpleModal';

type MentorModalProps = {
  isOpen: boolean;
  onClose(): void;
};

const MentorModal: React.FC<MentorModalProps> = ({ isOpen, onClose }) => {
  const [session] = useSession();
  const { warnings, mentorships } = useWarnings(session?.user?.id);

  return (
    <SimpleModal
      isOpen={isOpen}
      close={onClose}
      title="¡Oh no!"
      titleClasses="text-red-600 mt-2 ml-2"
      buttonLabel="Entiendo"
      buttonClasses="text-primary"
      footer={
        !session && (
          <button
            type="button"
            className="flex items-center mt-2 btn btn-secondary lg:mt-0 lg:ml-10 "
            style={{ transition: 'all .15s ease' }}
            onClick={() => signIn('discord')}
          >
            Iniciar sesión
            <FontAwesomeIcon icon={faDiscord} width="15px" className="ml-2" />
          </button>
        )
      }
    >
      <div className="px-2 overflow-auto text-lg text-zinc-100">
        {!session && (
          <p>Para poder solicitar una mentoría primero debes iniciar sesión.</p>
        )}
        {session && warnings > 0 && (
          <p>
            Tienes penalizaciones en mentorías anteriores, si crees que es un
            error{' '}
            <a
              target="_blank"
              href="https://discord.com/channels/594363964499165194/897161654377271346"
              rel="noreferrer"
              className="hover:text-greenFec underline"
            >
              contáctanos.
            </a>
          </p>
        )}
        {session && warnings === 0 && mentorships > 4 && (
          <p>
            Has llegado al límite de mentorías por mes, si crees que es un error{' '}
            <a
              target="_blank"
              href="https://discord.com/channels/594363964499165194/897161654377271346"
              rel="noreferrer"
              className="hover:text-greenFec underline"
            >
              contáctanos.
            </a>
          </p>
        )}
      </div>
    </SimpleModal>
  );
};

export default MentorModal;
