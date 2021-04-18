import { useQuery } from 'react-query';
import { getSettings } from '../lib/api';

export const useSettings = (preview: boolean = false) => {
  return useQuery('settings', () => getSettings(preview));
};
