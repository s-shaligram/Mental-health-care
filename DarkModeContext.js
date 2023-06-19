import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native-appearance';

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(
    Appearance.getColorScheme() === 'dark'
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  return (
    <DarkModeContext.Provider value={isDarkMode}>
      {children}
    </DarkModeContext.Provider>
  );
}
