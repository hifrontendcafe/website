import { ProfileFilters, Technology } from '@/lib/types';

interface FilterStringAction {
  type: 'ADD_ROLE' | 'ADD_LOCATION' | 'ADD_SENIORITY' | 'ADD_DESCRIPTION';
  payload: string;
}

interface FilterTechnologyAction {
  type: 'ADD_TECHNOLOGIES';
  payload: readonly Technology[];
}

interface FilterBooleanAction {
  type: 'SET_AVAILABLE';
  payload: boolean;
}

export type FilterProfileAction =
  | FilterStringAction
  | FilterTechnologyAction
  | FilterBooleanAction;

export function filterReducer(
  state: ProfileFilters,
  action: FilterProfileAction,
): ProfileFilters {
  switch (action.type) {
    case 'ADD_ROLE':
      return { ...state, roleId: action.payload };
    case 'ADD_LOCATION':
      return { ...state, location: action.payload };
    case 'ADD_SENIORITY':
      return { ...state, seniorityId: action.payload };
    case 'ADD_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'ADD_TECHNOLOGIES':
      return { ...state, technologies: [...action.payload] };
    case 'SET_AVAILABLE':
      return { ...state, available: action.payload };
    default:
      throw new Error('Invalid action');
  }
}
