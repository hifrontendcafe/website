import { useQuery } from 'react-query';
import { getSettings } from '../lib/api';

export const useSettings = (preview = false) => {
  return useQuery('settings', () => getSettings(preview));
};
