import { ExtendedProfile } from '@/lib/types';
import ProfileCard from '@/components/ProfileCard';

interface ProfilesProps {
  isLoading: boolean;
  isError: boolean;
  profiles: ExtendedProfile[];
}

const Profiles: React.FC<ProfilesProps> = ({
  isLoading,
  isError,
  profiles,
}) => {
  if (isLoading)
    return <div className="w-full mt-4 text-center">Cargando...</div>;

  if (isError)
    return (
      <div className="w-full mt-4 text-center">
        Hubo un error al cargar los perfiles, intente de nuevo
      </div>
    );

  if (profiles.length === 0) {
    return (
      <div className="w-full mt-4 text-center">
        No se han encontrado perfiles con los filtros aplicados.
      </div>
    );
  }

  return (
    <div className="grid gap-8 text-gray-300 md:grid-cols-2 place-content-stretch">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default Profiles;
