import Profiles from '@/components/Profiles';
import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/sanity/page/getPageByName';
import { getAllProfiles } from '@/lib/sanity/profile/getAllProfiles';
import { getAllRoles } from '@/lib/sanity/roles/getAllRoles';
import { getAllSeniorities } from '@/lib/sanity/seniority/getAllSeniorities';
import { getAllTechnologies } from '@/lib/sanity/technology/getAllTechnologies';
import { getPageMetadata } from '@/lib/seo';
import { shuffle } from '@/lib/shuffle';

function sortResponse<T extends { name: string }>(array: T[]) {
  return [
    ...array.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }),
  ];
}

export const generateMetadata = () => getPageMetadata('Talentos');

export default async function TalentsPage() {
  const [page, technologies, seniorities, profiles, roles] = await Promise.all([
    getPageByName({ name: 'Talentos' }),
    getAllTechnologies(),
    getAllSeniorities(),
    getAllProfiles({ next: { revalidate: 120 } }),
    getAllRoles(),
  ]);

  const formattedTechnologies = technologies.map((tech) => ({
    ...tech,
    label: tech.name,
    value: tech._id,
  }));

  sortResponse(technologies);
  sortResponse(seniorities);
  sortResponse(roles);

  shuffle(profiles);

  return (
    <>
      <SectionHero title={page?.title} paragraph={page?.description} />
      <Profiles
        profiles={profiles}
        technologies={formattedTechnologies}
        roles={roles}
        seniorities={seniorities}
      />
    </>
  );
}
