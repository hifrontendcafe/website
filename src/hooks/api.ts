import { useQuery } from 'react-query';
import { getSettings } from '../lib/api';
import { useRouter } from 'next/router';

export const useSettings = (preview = false) => {
  const { locale } = useRouter();

  return useQuery('settings', () => getSettings(locale, preview));
};
