import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { getSettings } from '@/lib/api';
import { ExtendedProfile } from '@/lib/types';
import { findProfiles } from '@/lib/prisma-queries';
import { shuffle } from '@/lib/shuffle';
import SectionHero from '@/components/SectionHero';
import Profiles from '@/components/Profiles';

interface PostsPageProps {
  profiles: ExtendedProfile[];
  preview?: boolean;
  technologies: { name: string; id: string }[];
  roles: { name: string; id: string }[];
  seniorities: { name: string; id: string }[];
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
      title="Comunidad"
      description="Encontrá los perfiles dentro de FEC"
      preview={preview}
    >
      <SectionHero
        title="Conoce nuestra comunidad"
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
  const sortResponse = (array) => {
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
  };

  const settings = await getSettings(preview);

  const rolesRepose = await prisma.role.findMany();
  const roles = sortResponse(rolesRepose);
  const technologiesResponse = await prisma.technology.findMany();
  const technologies = sortResponse(technologiesResponse);

  const formattedTechnologies = technologies.map((technology) => ({
    ...technology,
    label: technology.name,
    value: technology.id,
  }));

  const senioritiesResponse = await prisma.seniority.findMany();
  const seniorities = sortResponse(senioritiesResponse);

  const response = await findProfiles({ active: true });

  const profiles = response.map((profile) => ({
    ...profile,
    createdAt: profile.createdAt.toString(),
    updatedAt: profile.createdAt.toString(),
  }));

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
