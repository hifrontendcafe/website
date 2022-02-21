import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import {
  getAllRoles,
  getAllSeniorities,
  getAllTechnologies,
  getAllProfiles,
  getSettings,
} from '@/lib/api';
import { Profile, Role, Seniority, Technology } from '@/lib/types';
import { shuffle } from '@/lib/shuffle';
import SectionHero from '@/components/SectionHero';
import Profiles from '@/components/Profiles';

interface PostsPageProps {
  profiles: Profile[];
  preview?: boolean;
  technologies: Technology[];
  roles: Role[];
  seniorities: Seniority[];
}

const ProfilesPage: React.FC<PostsPageProps> = ({
  profiles,
  preview,
  seniorities,
  roles,
  technologies,
}) => {
  return (
    <Layout
      title="Talentos"
      description="Encontrá los perfiles dentro de FEC"
      preview={preview}
    >
      <SectionHero
        title="Talentos FEC"
        paragraph="Te invitamos a saber más sobre nuestros perfiles, sus iniciativas e
        intereses y poder conectarte a través de sus redes sociales."
      />
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
    },
    revalidate: 1,
  };
};

export default ProfilesPage;
