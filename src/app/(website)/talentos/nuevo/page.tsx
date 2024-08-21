import NewTalentForm from '@/components/NewTalentForm';
import SectionHero from '@/components/SectionHero';
import { getPageByName } from '@/lib/sanity/page/getPageByName';
import { getAllRoles } from '@/lib/sanity/roles/getAllRoles';
import { getAllSeniorities } from '@/lib/sanity/seniority/getAllSeniorities';
import { getAllTechnologies } from '@/lib/sanity/technology/getAllTechnologies';
import { getPageMetadata } from '@/lib/seo';

export const generateMetadata = () => getPageMetadata('Tu perfil');

export default async function NewTalentPage() {
  const [page, technologies, roles, seniorities] = await Promise.all([
    getPageByName({ name: 'Tu perfil' }, { next: { revalidate: 60 } }),
    getAllTechnologies(),
    getAllRoles(),
    getAllSeniorities(),
  ]);

  const formattedTechnologies = technologies.map((tech) => ({
    ...tech,
    label: tech.name,
    value: tech._id,
  }));

  return (
    <>
      <SectionHero title={page?.title} paragraph={page?.description} />

      <NewTalentForm
        roles={roles}
        seniorities={seniorities}
        technologies={formattedTechnologies}
      />
    </>
  );
}
