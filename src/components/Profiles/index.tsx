'use client';

import ProfileList from '@/components/ProfileList';
import FilterForm from '@/components/ProfilesFilterForm';
import { Profile, Role, Seniority, Technology } from '@/lib/types';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import PaginationBar from './PaginationBar';
import { useProfiles } from './useProfiles';

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
    <section className="space-y-24">
      <div ref={profileListRef}>
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
    </section>
  );
};

export default Profiles;
