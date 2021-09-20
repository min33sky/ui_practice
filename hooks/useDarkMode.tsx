import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useDarkMode(): [string, Dispatch<SetStateAction<'light' | 'dark'>>] {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
