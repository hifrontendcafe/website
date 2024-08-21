import ProfileCard from '@/components/ProfileCard';
import { Profile } from '@/lib/sanity/profile/getProfile';

interface ProfilesProps {
  isLoading: boolean;
  isError: boolean;
  profiles: Profile[];
}

const Profiles: React.FC<ProfilesProps> = ({
  isLoading,
  isError,
  profiles,
}) => {
  if (isLoading) return <div className="text-center">Cargando...</div>;

  if (isError)
    return (
      <div className="text-center">
        Hubo un error al cargar los perfiles, intente de nuevo
      </div>
    );

  if (profiles.length === 0) {
    return (
      <div className="text-center">
        No se han encontrado perfiles con los filtros aplicados.
      </div>
    );
  }

  return (
    <ul className="grid place-content-stretch gap-8 text-tertiary md:grid-cols-2 xl:grid-cols-3">
      {profiles.map((profile) => (
        <ProfileCard key={profile._id} profile={profile} />
      ))}
    </ul>
  );
};

export default Profiles;
