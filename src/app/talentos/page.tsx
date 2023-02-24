import Profiles from '@/components/Profiles';
import SectionHero from '@/components/SectionHero';
import {
  getAllProfiles,
  getAllRoles,
  getAllSeniorities,
  getAllTechnologies,
  getPageByName,
} from '@/lib/api.server';
import { shuffle } from '@/lib/shuffle';
import { getPageMetadata } from '@/lib/seo';

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

export const revalidate = 60;

export default async function TalentsPage() {
  const [page, technologies, seniorities, profiles, roles] = await Promise.all([
    getPageByName('Talentos'),
    getAllTechnologies(),
    getAllSeniorities(),
    getAllProfiles(),
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
