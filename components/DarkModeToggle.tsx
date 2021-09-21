import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <div
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="flex items-center justify-center w-10 h-10 transition duration-200 ease-out rounded-full cursor-pointer hover:bg-indigo-400 hover:bg-opacity-50"
      >
        {theme === 'light' ? <MoonIcon className="h-5" /> : <SunIcon className="h-5" />}
      </div>
    </div>
  );
}

export default DarkModeToggle;
