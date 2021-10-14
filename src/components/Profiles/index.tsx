import React from 'react';

import { ExtendedProfile } from '@/lib/types';
import { useSession } from 'next-auth/client';
import { useProfiles } from './useProfiles';

import FilterForm from '@/components/ProfilesFilterForm';
import SignupButton from '@/components/ProfileSignupButton';
import ProfileList from '@/components/ProfileList';

interface PostsPageProps {
  profiles: ExtendedProfile[];
  technologies: { name: string; id: string }[];
  roles: { name: string; id: string }[];
  seniorities: { name: string; id: string }[];
}

const Profiles: React.FC<PostsPageProps> = ({
  profiles,
  seniorities,
  roles,
  technologies,
}) => {
  const [session, loadingSession] = useSession();
  const { filters, dispatchFilter, filteredProfiles, isLoading, isError } =
    useProfiles(profiles);

  const hasProfile = profiles.some(
    (profile) => profile.discordId === session?.user?.id,
  );

  return (
    <div className="min-h-screen mx-auto">
      <div className="max-w">
        <FilterForm
          filters={filters}
          dispatch={dispatchFilter}
          roles={roles}
          seniorities={seniorities}
          technologies={technologies}
        />
      </div>
      <div className="px-4 py-5 sm:px-6 md:flex md:justify-between">
        <SignupButton loading={loadingSession} hasProfile={hasProfile} />
      </div>
      <ProfileList
        profiles={filteredProfiles}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Profiles;
