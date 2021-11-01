import {
  useState,
  useEffect,
  useReducer,
  Dispatch,
  SetStateAction,
} from 'react';
import { ExtendedProfile, ProfileFilters } from '@/lib/types';
import { filterReducer, FilterProfileAction } from './filterReducer';
import { useDebounce } from '@/lib/useDebounce';
import { shuffle } from '@/lib/shuffle';

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
const DEBOUNCE_TIME = 300;

/**
 * Number of profiles per page
 */
const ITEMS_PER_PAGE = 18;

interface UseProfilesResult {
  filters: ProfileFilters;
  dispatchFilter: Dispatch<FilterProfileAction>;
  isLoading: boolean;
  isError: boolean;
  pageProfiles: ExtendedProfile[];
  page: number;
  pagesCount: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function useProfiles(profiles: ExtendedProfile[]): UseProfilesResult {
  const [filters, dispatchFilter] = useReducer(
    filterReducer,
    initialProfileFilters,
  );

  const [page, setPage] = useState(1);
  const [pagesCount, setPageCount] = useState(
    Math.ceil(profiles.length / ITEMS_PER_PAGE),
  );

  const [filteredProfiles, setFilteredProfiles] =
    useState<FilteredProfilesState>({
      isLoading: false,
      isError: false,
      profiles,
    });

  const debouncedFilters = useDebounce(filters, DEBOUNCE_TIME);

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

      // randomizes profiles in place
      shuffle(profiles);

      // go back to page 1 in new search
      setPage(1);

      setPageCount(Math.ceil(profiles.length / ITEMS_PER_PAGE));

      setFilteredProfiles({ isLoading: false, isError: false, profiles });
    };

    fn();
  }, [debouncedFilters]);

  const offset = (page - 1) * ITEMS_PER_PAGE;
  const pageProfiles = filteredProfiles.profiles.slice(
    offset,
    offset + ITEMS_PER_PAGE,
  );

  return {
    filters,
    dispatchFilter,
    pageProfiles: pageProfiles,
    isLoading: filteredProfiles.isLoading,
    isError: filteredProfiles.isError,
    page,
    pagesCount,
    setPage,
  };
}
