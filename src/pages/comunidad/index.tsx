import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { getSettings } from '@/lib/api';
import { ExtendedProfile, ProfileFilters } from '@/lib/types';
import { findProfiles } from '@/lib/prisma-queries';
import { useSession } from 'next-auth/client';
import { shuffle } from '@/lib/shuffle';
import SectionHero from '@/components/SectionHero';
import SignupButton from '@/components/ProfileSignupButton';
import ProfileList from '@/components/ProfileList';
import ProfilesFilterForm from '@/components/ProfilesFilterForm';

type PostsPageProps = {
  profiles: ExtendedProfile[];
  preview?: boolean;
  technologies: { name: string; id: string }[];
  roles: { name: string; id: string }[];
  seniorities: { name: string; id: string }[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function post(url: string, body: Record<string, any>) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function searchProfiles(filters: ProfileFilters) {
  return post('/api/profiles/search', { filters });
}

const initialProfileState = {
  roleId: '',
  location: '',
  seniorityId: '',
  description: '',
  technologies: [],
  available: false,
};

const ProfilesPage: React.FC<PostsPageProps> = ({
  profiles,
  preview,
  seniorities,
  roles,
  technologies,
}) => {
  const [session, loadingSession] = useSession();

  const hasProfile = profiles.some(
    (profile) => profile.discordId === session?.user?.id,
  );

  const [filters, setFilters] = useState<ProfileFilters>(initialProfileState);

  const [loading, setLoading] = useState<boolean>(false);
  const [filteredProfiles, setFilteredProfiles] =
    useState<ExtendedProfile[]>(profiles);

  const filterProfiles = async () => {
    setLoading(true);
    const response = await searchProfiles(filters);
    setLoading(false);

    const profiles = await response.json();
    setFilteredProfiles(profiles);
  };

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
      <div className="min-h-screen mx-auto">
        <div className="max-w-5xl mx-auto mb-4">
          <ProfilesFilterForm
            filterProfiles={filterProfiles}
            technologies={technologies}
            roles={roles}
            seniorities={seniorities}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="px-4 py-5 sm:px-6 md:flex md:justify-between">
          <SignupButton loading={loadingSession} hasProfile={hasProfile} />
        </div>
        <ProfileList
          isLoading={loading}
          isError={false}
          profiles={filteredProfiles}
        />
      </div>
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
