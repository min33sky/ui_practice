import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

type NewType = 'light' | 'dark';

export default function useDarkMode(): [string, Dispatch<SetStateAction<'light' | 'dark'>>] {
  const [theme, setTheme] = useState<NewType>('light');

  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
