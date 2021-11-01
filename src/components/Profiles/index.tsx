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
  const {
    filters,
    dispatchFilter,
    isLoading,
    isError,
    page,
    setPage,
    pagesCount,
    pageProfiles,
  } = useProfiles(profiles);

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
        profiles={pageProfiles}
        isLoading={isLoading}
        isError={isError}
      />
      <div className="flex items-center justify-between my-4 px-8">
        <div>
          <button
            className="btn-secondary rounded-md px-2 py-1 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((page) => page - 1)}
          >
            ←
          </button>
          <span className="px-2">
            Página {page} de {pagesCount}
          </span>
          <button
            className="btn-secondary rounded-md px-2 py-1 disabled:opacity-50"
            disabled={page === pagesCount}
            onClick={() => setPage((page) => page + 1)}
          >
            →
          </button>
        </div>
        <span>
          Total de <span className="font-semibold">{pageProfiles.length}</span>{' '}
          perfiles
        </span>
      </div>
    </div>
  );
};

export default Profiles;
