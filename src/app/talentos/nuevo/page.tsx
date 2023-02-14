import { use } from 'react';
import {
  getAllRoles,
  getAllSeniorities,
  getAllTechnologies,
  getPageByName,
} from '@/lib/api.server';
import SectionHero from '@/components/SectionHero';
import NewTalentForm from '@/components/NewTalentForm';
import { getPageMetadata } from '@/lib/seo';

export const revalidate = 60;

export const generateMetadata = () => getPageMetadata('Tu perfil');

export default function NewTalentPage() {
  const page = use(getPageByName('Tu perfil'));
  const technologies = use(getAllTechnologies());
  const roles = use(getAllRoles());
  const seniorities = use(getAllSeniorities());

  const formattedTechnologies = technologies.map((tech) => ({
    ...tech,
    label: tech.name,
    value: tech._id,
  }));

  return (
    <>
      <SectionHero title={page.title} paragraph={page.description} />

      <NewTalentForm
        roles={roles}
        seniorities={seniorities}
        technologies={formattedTechnologies}
      />
    </>
  );
}
