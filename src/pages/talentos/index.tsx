import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import {
  getAllRoles,
  getAllSeniorities,
  getAllTechnologies,
  getAllProfiles,
  getSettings,
  getPageByHero,
} from '@/lib/api';
import { Profile, Role, Seniority, Technology } from '@/lib/types';
import { shuffle } from '@/lib/shuffle';
import SectionHero from '@/components/SectionHero';
import Profiles from '@/components/Profiles';
import { Page } from '../../lib/types';

interface PostsPageProps {
  profiles: Profile[];
  preview?: boolean;
  technologies: Technology[];
  roles: Role[];
  seniorities: Seniority[];
  page: Page;
}

const ProfilesPage: React.FC<PostsPageProps> = ({
  profiles,
  preview,
  seniorities,
  roles,
  technologies,
  page,
}) => {
  return (
    <Layout
      title={page.title}
      description={page.shortDescription}
      metadata={page.metadata}
      preview={preview}
    >
      <SectionHero title={page.title} paragraph={page.description} />
      <Profiles
        profiles={profiles}
        technologies={technologies}
        roles={roles}
        seniorities={seniorities}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
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

  const settings = await getSettings(preview);

  const rolesRepose = await getAllRoles(preview);
  const roles = sortResponse(rolesRepose);
  const technologiesResponse = await getAllTechnologies(preview);
  const technologies = sortResponse(technologiesResponse);

  const formattedTechnologies = technologies.map((technology) => ({
    ...technology,
    label: technology.name,
    value: technology._id,
  }));

  const senioritiesResponse = await getAllSeniorities(preview);
  const seniorities = sortResponse(senioritiesResponse);

  const profiles = await getAllProfiles(preview);
  const page = await getPageByHero(preview, 'Talentos FEC');
  // randomizes profiles in place
  shuffle(profiles);

  return {
    props: {
      profiles,
      preview,
      settings,
      technologies: formattedTechnologies,
      roles,
      seniorities,
      page,
    },
    revalidate: 1,
  };
};

export default ProfilesPage;
