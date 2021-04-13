import { createContext, useContext, useEffect, useState } from 'react';
import { getSettings } from './api';

const AppSettings = createContext();

export function AppWrapper({ children }) {
  const [settings, setSettings] = useState({});

  useEffect(() => getSettings().then((res) => setSettings(res)), []);

  return (
    <AppSettings.Provider value={settings}>{children}</AppSettings.Provider>
  );
}

export function useSettings() {
  return useContext(AppSettings);
}
