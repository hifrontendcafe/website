import { use } from 'react';
import { notFound } from 'next/navigation';
import { getProfile } from '@/lib/api.server';
import type { AppPage } from '@/lib/types';
import { getMetadata } from '@/lib/seo';

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

const ProfilePage: AppPage<{ id: string }> = ({ params }) => {
  const profile = use(getProfile(params.id));

  if (!profile?.person?.discord) return notFound();

  return (
    <div className="flex items-center justify-center py-10 mx-auto">
      <div className="flex justify-between w-3/5 px-10 py-4 border-4 rounded-lg border-greenFec">
        <img
          src={profile.person.photo}
          alt={profile.person.firstName}
          className="object-cover object-top w-40 h-40 rounded-full shadow-lg"
        />
        <div className="flex flex-col ml-8 text-greenFec">
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
