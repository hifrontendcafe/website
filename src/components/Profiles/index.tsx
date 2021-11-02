import React, { useRef, useEffect } from 'react';

import { ExtendedProfile } from '@/lib/types';
import { useProfiles } from './useProfiles';

import FilterForm from '@/components/ProfilesFilterForm';
import ProfileList from '@/components/ProfileList';
import PaginationBar from './PaginationBar';

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
  const {
    filters,
    dispatchFilter,
    isLoading,
    isError,
    page,
    setPage,
    pagesCount,
    pageProfiles,
    totalProfiles,
  } = useProfiles(profiles);

  const profileListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    profileListRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen mx-auto">
      <div ref={profileListRef} className="max-w mb-24">
        <FilterForm
          filters={filters}
          dispatch={dispatchFilter}
          roles={roles}
          seniorities={seniorities}
          technologies={technologies}
        />
      </div>
      <ProfileList
        profiles={pageProfiles}
        isLoading={isLoading}
        isError={isError}
      />
      <PaginationBar
        page={page}
        pagesCount={pagesCount}
        setPage={setPage}
        totalProfiles={totalProfiles}
      />
    </div>
  );
};

export default Profiles;
