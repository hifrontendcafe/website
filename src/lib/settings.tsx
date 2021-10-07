import React, { createContext } from 'react';
import { Settings } from './types';

export const AppSettings = createContext(null);

interface SettingsProviderProps {
  settings: Settings;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  settings,
  children,
}) => {
  return (
    <AppSettings.Provider value={settings}>{children}</AppSettings.Provider>
  );
};

export function useSettings(): Settings {
  const context = React.useContext<Settings>(AppSettings);

  if (context === undefined) {
    throw new Error(
      'useSettings must be used within a SettingsProvider (be sure that the page is exposing settings in getStaticProps)',
    );
  }

  return context;
}
