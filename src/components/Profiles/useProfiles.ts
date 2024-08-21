import { ProfileFilters } from '@/lib/sanity/profile/filterProfiles';
import { Profile } from '@/lib/sanity/profile/getProfile';
import { shuffle } from '@/lib/shuffle';
import { useDebounce } from '@/lib/useDebounce';
import queryString from 'query-string';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { FilterProfileAction, filterReducer } from './filterReducer';

function searchProfiles(filters: ProfileFilters) {
  const query = queryString.stringify({
    ...filters,
    technologies: filters.technologies?.map((t) => t._id),
  });

  return fetch(`/api/profiles/search?${query}`);
}

interface FilteredProfilesState {
  isLoading: boolean;
  isError: boolean;
  profiles?: Profile[];
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
  pageProfiles: Profile[];
  page: number;
  pagesCount: number;
  totalProfiles: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function useProfiles(profiles: Profile[]): UseProfilesResult {
  const initialLoad = useRef<boolean>(true);

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
    if (!initialLoad.current) {
      setFilteredProfiles({ isLoading: true, isError: false, profiles: [] });
    }
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

    if (initialLoad.current) {
      initialLoad.current = false;
    } else {
      fn();
    }
  }, [debouncedFilters]);

  const offset = (page - 1) * ITEMS_PER_PAGE;
  const pageProfiles =
    filteredProfiles.profiles?.slice(offset, offset + ITEMS_PER_PAGE) ?? [];

  return {
    filters,
    dispatchFilter,
    pageProfiles: pageProfiles,
    isLoading: filteredProfiles.isLoading,
    isError: filteredProfiles.isError,
    page,
    pagesCount,
    totalProfiles: profiles.length,
    setPage,
  };
}
