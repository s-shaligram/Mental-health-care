import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native-appearance';

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    Appearance.getColorScheme() === 'dark'
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkModeEnabled(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  return (
    <DarkModeContext.Provider value={darkModeEnabled}>
      {children}
    </DarkModeContext.Provider>
  );
}
