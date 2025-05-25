import { useMantineColorScheme } from '@mantine/core';
import { useState, useEffect } from 'react';

interface UseColorThemeModeReturn
  extends Pick<ReturnType<typeof useMantineColorScheme>, 'toggleColorScheme'> {
  isMounted: boolean;
  isDarkMode: boolean;
}

export const useColorThemeMode = (): UseColorThemeModeReturn => {
  const [isMounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (!isMounted) {
      setIsDarkMode(colorScheme === 'dark');
      setMounted(true);
    }

    return () => {
      setIsDarkMode(false);
      setMounted(false);
    };
  }, [colorScheme]);
  return {
    isMounted,
    isDarkMode,
    toggleColorScheme,
  };
};
