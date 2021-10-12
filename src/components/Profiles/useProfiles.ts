import { useState, useEffect, useReducer, Dispatch } from 'react';
import { ExtendedProfile, ProfileFilters } from '@/lib/types';
import { filterReducer, FilterProfileAction } from './filterReducer';
import { useDebounce } from '@/lib/useDebounce';

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

interface FilteredProfilesState {
  isLoading: boolean;
  isError: boolean;
  profiles?: ExtendedProfile[];
}

const initialProfileFilters: ProfileFilters = {
  roleId: '',
  location: '',
  seniorityId: '',
  description: '',
  technologies: [],
  available: false,
};

// https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
/**
 * Minimum time between requests to database (in ms)
 */
const debounceTime = 300;

interface UseProfilesResult {
  filters: ProfileFilters;
  dispatchFilter: Dispatch<FilterProfileAction>;
  isLoading: boolean;
  isError: boolean;
  filteredProfiles: ExtendedProfile[];
}

export function useProfiles(profiles: ExtendedProfile[]): UseProfilesResult {
  const [filters, dispatchFilter] = useReducer(
    filterReducer,
    initialProfileFilters,
  );

  const [filteredProfiles, setFilteredProfiles] =
    useState<FilteredProfilesState>({
      isLoading: false,
      isError: false,
      profiles,
    });

  const debouncedFilters = useDebounce(filters, debounceTime);

  useEffect(() => {
    setFilteredProfiles({ isLoading: true, isError: false, profiles: [] });
  }, [filters]);

  useEffect(() => {
    const fn = async () => {
      const response = await searchProfiles(debouncedFilters);

      let profiles = [];
      try {
        profiles = await response.json();
      } catch (error) {
        setFilteredProfiles({ isLoading: false, isError: true, profiles: [] });
      }

      setFilteredProfiles({ isLoading: false, isError: false, profiles });
    };

    fn();
  }, [debouncedFilters]);

  return {
    filters,
    dispatchFilter,
    filteredProfiles: filteredProfiles.profiles,
    isLoading: filteredProfiles.isLoading,
    isError: filteredProfiles.isError,
  };
}
