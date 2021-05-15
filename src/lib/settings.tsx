import { createContext, useContext, useState } from 'react';

export const AppSettings = createContext(null);

export function AppWrapper({ children }) {
  const [settings] = useState({});

  return (
    <AppSettings.Provider value={settings}>{children}</AppSettings.Provider>
  );
}

export function useSettings() {
  return useContext(AppSettings);
}
