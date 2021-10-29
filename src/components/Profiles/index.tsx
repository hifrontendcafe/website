import React from 'react';

import { ExtendedProfile } from '@/lib/types';
import { useProfiles } from './useProfiles';

import FilterForm from '@/components/ProfilesFilterForm';
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
  const { filters, dispatchFilter, filteredProfiles, isLoading, isError } =
    useProfiles(profiles);

  return (
    <div className="min-h-screen mx-auto">
      <div className="max-w mb-24">
        <FilterForm
          filters={filters}
          dispatch={dispatchFilter}
          roles={roles}
          seniorities={seniorities}
          technologies={technologies}
        />
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
