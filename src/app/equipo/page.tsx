import { use } from 'react';
import { getPageByName, getFecTeam } from '@/lib/api.server';
import SectionHero from '@/components/SectionHero';
import StaffCard from '@/components/StaffCard';
import { getPageMetadata } from '@/lib/seo';

export const revalidate = 60;

export const generateMetadata = () => getPageMetadata('Equipo');

export default function TeamPage() {
  const page = use(getPageByName('Equipo'));
  const profiles = use(getFecTeam());

  return (
    <>
      <SectionHero title={page.title} />
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-8 px-6 py-5 text-secondary lg:pt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-stretch">
          {profiles?.map((profile) => (
            <StaffCard profile={profile} key={profile._id} />
          ))}
        </div>
      </div>
    </>
  );
}
