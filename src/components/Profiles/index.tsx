'use client';

import React, { useRef, useEffect, useState, SetStateAction } from 'react';

import { Profile, Role, Seniority, Technology } from '@/lib/types';
import { useProfiles } from './useProfiles';

import FilterForm from '@/components/ProfilesFilterForm';
import ProfileList from '@/components/ProfileList';
import PaginationBar from './PaginationBar';

interface PostsPageProps {
  profiles: Profile[];
  technologies: Technology[];
  roles: Role[];
  seniorities: Seniority[];
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
  const [hasToScroll, setHasToScroll] = useState(false);

  const profileListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasToScroll) {
      profileListRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasToScroll(false);
    }
  }, [hasToScroll]);

  const moveToPage = (page: SetStateAction<number>) => {
    setHasToScroll(true);
    setPage(page);
  };

  return (
    <div className="min-h-screen mx-auto">
      <div ref={profileListRef} className="mb-24 max-w">
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
        setPage={moveToPage}
        totalProfiles={totalProfiles}
      />
    </div>
  );
};

export default Profiles;
