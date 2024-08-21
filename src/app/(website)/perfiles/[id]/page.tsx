import { getProfile } from '@/lib/sanity/profile/getProfile';
import { getMetadata } from '@/lib/seo';
import type { AppPage } from '@/lib/types';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => [];

export const dynamicParams = true;

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const profile = await getProfile(params.id);

  return await getMetadata({
    title: `Perfil: ${profile?.person?.firstName}`,
    description: 'Compartí tu profile FEC a las redes',
  });
};

const ProfilePage: AppPage<{ id: string }> = async ({ params }) => {
  const profile = await getProfile(params.id);

  if (!profile?.person?.discord) return notFound();

  return (
    <div className="mx-auto flex items-center justify-center py-10">
      <div className="flex w-3/5 justify-between rounded-lg border-4 border-greenFec px-10 py-4">
        <img
          src={profile.person.photo}
          alt={profile.person.firstName}
          className="h-40 w-40 rounded-full object-cover object-top shadow-lg"
        />
        <div className="ml-8 flex flex-col text-greenFec">
          <span>
            <b>Usuario: </b>
            {profile.person.firstName} ({profile.person.discord})
          </span>
          {profile.person.github && (
            <span>
              <b>GitHub: </b>
              {profile.person.github}
            </span>
          )}
          {profile.person.portfolio && (
            <span>
              <b>Portfolio: </b>
              {profile.person.portfolio}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
