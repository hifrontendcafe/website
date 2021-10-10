import Spinner from '@/components/Spinner';
import { signIn } from 'next-auth/client';

function signInDiscord() {
  return signIn('discord', {
    callbackUrl: `${window.location.origin}/comunidad/nuevo`,
  });
}

interface SignupButtonProps {
  loading: boolean;
  hasProfile: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = ({ loading, hasProfile }) => {
  if (loading) {
    return (
      <button className="btn btn-primary" disabled>
        <Spinner />
      </button>
    );
  }

  if (hasProfile) {
    return (
      <button className="btn btn-primary" onClick={() => signInDiscord()}>
        Modifica tu perfil
      </button>
    );
  }

  return (
    <button className="btn btn-primary" onClick={() => signInDiscord()}>
      Crea tu perfil
    </button>
  );
};

export default SignupButton;
