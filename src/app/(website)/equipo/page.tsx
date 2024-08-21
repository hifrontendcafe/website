import SectionHero from '@/components/SectionHero';
import StaffCard from '@/components/StaffCard';
import { getPageByName } from '@/lib/sanity/page/getPageByName';
import { getFecTeam } from '@/lib/sanity/person/getFecTeam';
import { getPageMetadata } from '@/lib/seo';

export const generateMetadata = () => getPageMetadata('Equipo');

export default async function TeamPage() {
  const [page, profiles] = await Promise.all([
    getPageByName({ name: 'Equipo' }),
    getFecTeam({ next: { revalidate: 60 } }),
  ]);

  return (
    <SectionHero title={page.title}>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-16 text-secondary md:grid-cols-3 lg:grid-cols-5 lg:pt-20">
        {profiles?.map((profile, i) => (
          <StaffCard index={i} profile={profile} key={profile._id} />
        ))}
      </ul>
    </SectionHero>
  );
}
